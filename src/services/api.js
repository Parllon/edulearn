// Camada de serviço estilo "fetch": funções assíncronas com latência simulada,
// tratamento de erros e overlays de localStorage sobre os dados mock.
//
// API_URL é um placeholder para um backend real. Hoje os dados vêm do mock local;
// para plugar uma API REST de verdade, troque os corpos das funções por chamadas
// `fetch(`${API_URL}/...`)` mantendo as mesmas assinaturas.

import {
  achievementDefs,
  courses as mockCourses,
  defaultSettings,
} from '../data/mockData';
import { readJSON, StorageKeys, writeJSON } from './storage';

export const API_URL = import.meta.env.VITE_API_URL ?? '/mock';

/** Latência simulada para exercitar os estados de "Carregando...". */
function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---- Helpers de progresso ------------------------------------------------------

function progressKey(courseId, lessonId) {
  return `${courseId}:${lessonId}`;
}

function getProgressMap() {
  return readJSON(StorageKeys.lessonProgress, {});
}

function isCompleted(courseId, lesson, map) {
  const override = map[progressKey(courseId, lesson.id)];
  return override ?? Boolean(lesson.completedByDefault);
}

function courseProgress(course, map) {
  const all = course.modules.flatMap((m) => m.lessons);
  const done = all.filter((l) => isCompleted(course.id, l, map)).length;
  const progress = all.length === 0 ? 0 : Math.round((done / all.length) * 100);
  return { total: all.length, done, progress, complete: all.length > 0 && done === all.length };
}

function toSummary(course, map) {
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const { total: totalLessons, done: completedLessons, progress } = courseProgress(course, map);
  const nextLesson = allLessons.find((l) => !isCompleted(course.id, l, map))?.title ?? null;

  return {
    id: course.id,
    title: course.title,
    instructor: course.instructor,
    rating: course.rating,
    students: course.students,
    duration: course.duration,
    level: course.level,
    category: course.category,
    thumbnail: course.thumbnail,
    description: course.description,
    totalLessons,
    completedLessons,
    progress,
    nextLesson,
  };
}

// ---- Certificados conquistados -------------------------------------------------

/** Converte "8h 30m" em um total de horas inteiro (mínimo 1). */
function hoursFromDuration(duration) {
  const h = /(\d+)\s*h/.exec(duration);
  const m = /(\d+)\s*m/.exec(duration);
  const hours = (h ? Number(h[1]) : 0) + (m ? Number(m[1]) : 0) / 60;
  return Math.max(1, Math.round(hours));
}

function todayLabel() {
  return new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function genCertificateId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `CERT-${new Date().getFullYear()}-${n}`;
}

/**
 * Emite (uma única vez) um certificado para cada curso 100% concluído.
 * Mantém data e ID estáveis em localStorage após a primeira emissão.
 */
function syncEarnedCertificates(map) {
  const earned = readJSON(StorageKeys.earnedCertificates, {});
  let changed = false;
  for (const course of mockCourses) {
    if (courseProgress(course, map).complete && !earned[course.id]) {
      earned[course.id] = { certificateId: genCertificateId(), completedDate: todayLabel() };
      changed = true;
    }
  }
  if (changed) writeJSON(StorageKeys.earnedCertificates, earned);
  return earned;
}

// ---- Estatísticas e conquistas -------------------------------------------------

function computeStats(map) {
  let lessonsCompleted = 0;
  let coursesCompleted = 0;
  let coursesStarted = 0;
  let maxProgress = 0;

  for (const course of mockCourses) {
    const { done, progress, complete } = courseProgress(course, map);
    lessonsCompleted += done;
    if (progress > 0) coursesStarted += 1;
    if (complete) coursesCompleted += 1;
    if (progress > maxProgress) maxProgress = progress;
  }
  return { lessonsCompleted, coursesCompleted, coursesStarted, maxProgress };
}

function computeAchievements(map) {
  const stats = computeStats(map);
  const certificates = Object.keys(readJSON(StorageKeys.earnedCertificates, {})).length;
  const metrics = { ...stats, certificates };

  return achievementDefs.map((def) => {
    const value = metrics[def.metric] ?? 0;
    const unlocked = value >= def.target;
    const progress = def.target === 0 ? 100 : Math.min(100, Math.round((value / def.target) * 100));
    return {
      ...def,
      value,
      current: Math.min(value, def.target),
      unlocked,
      progress,
    };
  });
}

// ---- API pública ---------------------------------------------------------------

export async function getDashboard() {
  await delay();
  const map = getProgressMap();
  const summaries = mockCourses.map((c) => toSummary(c, map));
  const inProgress = summaries.filter((c) => c.progress > 0 && c.progress < 100);
  const earned = syncEarnedCertificates(map);

  const stats = [
    { label: 'Cursos em Andamento', value: String(inProgress.length), icon: 'BookOpen', color: '#3b82f6' },
    { label: 'Horas Assistidas', value: '24.5', icon: 'Clock', color: '#a855f7' },
    { label: 'Certificados', value: String(Object.keys(earned).length), icon: 'Award', color: '#22c55e' },
    { label: 'Sequência Atual', value: '7 dias', icon: 'TrendingUp', color: '#f97316' },
  ];

  const unlocked = computeAchievements(map).filter((a) => a.unlocked);
  return { stats, coursesInProgress: inProgress, achievements: unlocked };
}

export async function getCourses() {
  await delay();
  const map = getProgressMap();
  return mockCourses.map((c) => toSummary(c, map));
}

export async function searchCourses(query) {
  await delay();
  const map = getProgressMap();
  const q = query.trim().toLowerCase();
  const summaries = mockCourses.map((c) => toSummary(c, map));
  if (!q) return summaries;
  return summaries.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q),
  );
}

export async function getCourseById(id) {
  await delay();
  const course = mockCourses.find((c) => c.id === id);
  if (!course) return null;

  const map = getProgressMap();
  const summary = toSummary(course, map);
  const modules = course.modules.map((m) => ({
    id: m.id,
    title: m.title,
    lessons: m.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      duration: l.duration,
      completed: isCompleted(course.id, l, map),
    })),
  }));

  const allLessons = modules.flatMap((m) => m.lessons);
  const currentLessonId = allLessons.find((l) => !l.completed)?.id ?? allLessons[0]?.id ?? null;

  return { ...summary, modules, currentLessonId };
}

export async function setLessonCompleted(courseId, lessonId, done) {
  await delay(150);
  const map = getProgressMap();
  map[progressKey(courseId, lessonId)] = done;
  writeJSON(StorageKeys.lessonProgress, map);
  // Emite o diploma automaticamente se esta foi a última aula do curso.
  syncEarnedCertificates(map);
}

export async function getCertificates() {
  await delay();
  const map = getProgressMap();
  const earned = syncEarnedCertificates(map);
  // Um certificado para cada curso concluído, do mais recente para o mais antigo.
  return mockCourses
    .filter((c) => earned[c.id])
    .map((c) => ({
      id: c.id,
      courseName: c.title,
      instructor: c.instructor,
      completedDate: earned[c.id].completedDate,
      certificateId: earned[c.id].certificateId,
      hours: hoursFromDuration(c.duration),
    }))
    .reverse();
}

export async function getAchievements() {
  await delay();
  const map = getProgressMap();
  syncEarnedCertificates(map);
  const achievements = computeAchievements(map);
  return {
    achievements,
    unlocked: achievements.filter((a) => a.unlocked).length,
    total: achievements.length,
  };
}

export async function getUserSettings() {
  await delay();
  const stored = readJSON(StorageKeys.settings, null);
  return stored ? { ...defaultSettings, ...stored } : defaultSettings;
}

export async function saveUserSettings(settings) {
  await delay();
  writeJSON(StorageKeys.settings, settings);
  return settings;
}
