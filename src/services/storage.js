// Helpers de localStorage, com namespacing e try/catch defensivo
// (SSR / modo privado / storage cheio não devem quebrar a aplicação).

const NS = 'edulearn';

export const StorageKeys = {
  theme: `${NS}:theme`,
  settings: `${NS}:settings`,
  // Progresso de aulas concluídas: mapa de `${courseId}:${lessonId}` -> boolean
  lessonProgress: `${NS}:lessonProgress`,
  // Autenticação (mock): lista de usuários cadastrados e sessão ativa.
  users: `${NS}:users`,
  session: `${NS}:session`,
  // Certificados emitidos ao concluir cursos: mapa de `courseId` -> { certificateId, completedDate }
  earnedCertificates: `${NS}:earnedCertificates`,
};

export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignora falhas de escrita (ex.: quota excedida ou storage indisponível).
  }
}

export function readString(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeString(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignora falhas de escrita.
  }
}
