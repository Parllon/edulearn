import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import VideoPlayer from '../../components/VideoPlayer';
import RightSidebar from '../../components/RightSidebar';
import { getCourseById, setLessonCompleted } from '../../../services/api';
import styles from './AssistirAula.module.css';

export default function AssistirAula() {
  const { id } = useParams();
  const courseId = Number(id);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLessonId, setCurrentLessonId] = useState(null);

  const load = useCallback(async () => {
    if (Number.isNaN(courseId)) {
      setError('Curso inválido.');
      setLoading(false);
      return;
    }
    try {
      const detail = await getCourseById(courseId);
      if (!detail) {
        setError('Curso não encontrado.');
        setCourse(null);
        return;
      }
      setCourse(detail);
      // Inicializa a aula atual apenas na primeira carga; preserva a seleção do usuário depois.
      setCurrentLessonId((prev) => prev ?? detail.currentLessonId);
      setError(null);
    } catch {
      setError('Não foi possível carregar o curso.');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleToggleComplete = async (lessonId, done) => {
    await setLessonCompleted(courseId, lessonId, done);
    await load(); // recarrega para recalcular progresso/checkmarks
  };

  if (loading) {
    return <div className={styles.stateInfo}>Carregando aula...</div>;
  }

  if (error || !course) {
    return (
      <div className={styles.stateError}>
        <p className={styles.errorText}>{error ?? 'Curso não encontrado.'}</p>
        <Link to="/cursos" className={styles.errorLink}>
          Voltar para Meus Cursos
        </Link>
      </div>
    );
  }

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentLesson = allLessons.find((l) => l.id === currentLessonId) ?? allLessons[0] ?? null;
  const currentModule = course.modules.find((m) => m.lessons.some((l) => l.id === currentLesson?.id));
  const lessonNumber = currentLesson ? allLessons.findIndex((l) => l.id === currentLesson.id) + 1 : 0;

  return (
    <div className={styles.layout}>
      {/* Área central com o player */}
      <main className={styles.main}>
        <div className={styles.mainInner}>
          <VideoPlayer
            courseTitle={course.title}
            instructor={course.instructor}
            description={course.description}
            lesson={currentLesson}
            moduleLabel={
              currentModule && currentLesson ? `Módulo ${currentModule.id} • Aula ${lessonNumber}` : ''
            }
            onToggleComplete={
              currentLesson
                ? () => handleToggleComplete(currentLesson.id, !currentLesson.completed)
                : undefined
            }
          />
        </div>
      </main>

      {/* Barra lateral com o currículo */}
      <RightSidebar
        modules={course.modules}
        currentLessonId={currentLesson?.id ?? null}
        onSelectLesson={setCurrentLessonId}
      />
    </div>
  );
}
