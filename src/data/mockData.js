// Fonte única da verdade dos dados mock da plataforma EduLearn.
// A camada de serviço (src/services/api.js) lê destes dados e sobrepõe
// overrides do usuário (progresso de aulas, configurações) vindos do localStorage.

export const courses = [
  {
    id: 1,
    title: 'React Completo: Do Básico ao Avançado',
    instructor: 'Dra. Emily Chen',
    rating: 4.8,
    students: 12500,
    duration: '8h 30m',
    level: 'Intermediário',
    category: 'Desenvolvimento Web',
    thumbnail: 'gradient-1',
    description:
      'Aprenda os fundamentos do React Hooks incluindo useState e useEffect. Este curso cobre as melhores práticas para gerenciar estado de componentes e efeitos colaterais em aplicações React modernas.',
    modules: [
      {
        id: 1,
        title: 'Começando com React',
        lessons: [
          { id: 1, title: 'Introdução ao Curso', duration: '3:24', completedByDefault: true },
          { id: 2, title: 'Configurando seu Ambiente', duration: '8:15', completedByDefault: true },
          { id: 3, title: 'Introdução ao React Hooks', duration: '12:45', completedByDefault: true },
          { id: 4, title: 'Construindo seu Primeiro Componente', duration: '15:30', completedByDefault: true },
        ],
      },
      {
        id: 2,
        title: 'Gerenciamento Avançado de Estado',
        lessons: [
          { id: 5, title: 'Visão Geral da Context API', duration: '10:20', completedByDefault: true },
          { id: 6, title: 'Hook useReducer', duration: '14:35', completedByDefault: true },
          { id: 7, title: 'Hooks Personalizados', duration: '11:50' },
        ],
      },
      {
        id: 3,
        title: 'Otimização de Performance',
        lessons: [
          { id: 8, title: 'React.memo e useMemo', duration: '13:15' },
          { id: 9, title: 'Hook useCallback', duration: '9:40' },
          { id: 10, title: 'Estratégias de Code Splitting', duration: '16:25' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'TypeScript para Desenvolvedores React',
    instructor: 'Prof. Marcus Silva',
    rating: 4.9,
    students: 8300,
    duration: '6h 15m',
    level: 'Avançado',
    category: 'Desenvolvimento Web',
    thumbnail: 'gradient-2',
    description:
      'Domine TypeScript aplicado ao React: tipagem de props, hooks, generics e padrões avançados para construir aplicações robustas e de fácil manutenção.',
    modules: [
      {
        id: 1,
        title: 'Fundamentos de TypeScript',
        lessons: [
          { id: 1, title: 'Tipos Básicos e Inferência', duration: '9:10', completedByDefault: true },
          { id: 2, title: 'Interfaces e Types', duration: '11:20', completedByDefault: true },
          { id: 3, title: 'Tipos Genéricos e Utilitários', duration: '13:05' },
        ],
      },
      {
        id: 2,
        title: 'TypeScript no React',
        lessons: [
          { id: 4, title: 'Tipando Props e Estado', duration: '12:40' },
          { id: 5, title: 'Tipando Hooks Personalizados', duration: '10:55' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Node.js e APIs RESTful',
    instructor: 'Ana Rodrigues',
    rating: 4.7,
    students: 15200,
    duration: '7h 45m',
    level: 'Intermediário',
    category: 'Backend',
    thumbnail: 'gradient-3',
    description:
      'Construa APIs RESTful escaláveis com Node.js e Express, com autenticação JWT, validação e boas práticas de arquitetura.',
    modules: [
      {
        id: 1,
        title: 'Fundamentos de Node.js',
        lessons: [
          { id: 1, title: 'Introdução ao Node.js', duration: '7:30', completedByDefault: true },
          { id: 2, title: 'Módulos e NPM', duration: '9:15', completedByDefault: true },
          { id: 3, title: 'Criando um Servidor HTTP', duration: '12:00' },
        ],
      },
      {
        id: 2,
        title: 'APIs com Express',
        lessons: [
          { id: 4, title: 'Rotas e Middlewares', duration: '11:25' },
          { id: 5, title: 'Autenticação com JWT', duration: '15:10' },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Design System e Component Library',
    instructor: 'Carlos Mendes',
    rating: 4.6,
    students: 5400,
    duration: '5h 20m',
    level: 'Intermediário',
    category: 'Design',
    thumbnail: 'gradient-4',
    description:
      'Aprenda a projetar e construir um design system consistente e uma biblioteca de componentes reutilizáveis do zero.',
    modules: [
      {
        id: 1,
        title: 'Fundamentos de Design System',
        lessons: [
          { id: 1, title: 'O que é um Design System', duration: '8:00' },
          { id: 2, title: 'Tokens de Design', duration: '10:30' },
          { id: 3, title: 'Componentes Base', duration: '12:15' },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Testes Automatizados com Jest e Testing Library',
    instructor: 'Julia Santos',
    rating: 4.9,
    students: 9800,
    duration: '4h 50m',
    level: 'Intermediário',
    category: 'Qualidade',
    thumbnail: 'gradient-5',
    description:
      'Garanta a qualidade do seu código com testes unitários e de integração usando Jest e a Testing Library.',
    modules: [
      {
        id: 1,
        title: 'Introdução a Testes',
        lessons: [
          { id: 1, title: 'Por que Testar', duration: '6:45' },
          { id: 2, title: 'Primeiro Teste com Jest', duration: '9:20' },
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Deploy e CI/CD com GitHub Actions',
    instructor: 'Roberto Lima',
    rating: 4.7,
    students: 7600,
    duration: '3h 30m',
    level: 'Avançado',
    category: 'DevOps',
    thumbnail: 'gradient-6',
    description:
      'Automatize build, testes e deploy com pipelines de CI/CD usando GitHub Actions.',
    modules: [
      {
        id: 1,
        title: 'Pipelines de CI/CD',
        lessons: [
          { id: 1, title: 'Conceitos de CI/CD', duration: '7:10', completedByDefault: true },
          { id: 2, title: 'Workflows do GitHub Actions', duration: '11:40', completedByDefault: true },
          { id: 3, title: 'Deploy Automatizado', duration: '13:55', completedByDefault: true },
        ],
      },
    ],
  },
];

// Definições de conquistas. Cada uma é desbloqueada quando a métrica calculada
// a partir do progresso real (ver src/services/api.js) atinge o `target`.
//   metric: 'lessonsCompleted' | 'coursesCompleted' | 'coursesStarted'
//         | 'certificates' | 'maxProgress'
export const achievementDefs = [
  { id: 'first-lesson', icon: '🎯', title: 'Primeiros Passos', description: 'Conclua sua primeira aula', metric: 'lessonsCompleted', target: 1 },
  { id: 'five-lessons', icon: '📚', title: 'Pegando o Ritmo', description: 'Conclua 5 aulas', metric: 'lessonsCompleted', target: 5 },
  { id: 'ten-lessons', icon: '🔥', title: 'Dedicado', description: 'Conclua 10 aulas', metric: 'lessonsCompleted', target: 10 },
  { id: 'twentyfive-lessons', icon: '🚀', title: 'Maratonista', description: 'Conclua 25 aulas', metric: 'lessonsCompleted', target: 25 },
  { id: 'halfway', icon: '⚡', title: 'Quase Lá', description: 'Alcance 50% de progresso em algum curso', metric: 'maxProgress', target: 50 },
  { id: 'explorer', icon: '🧭', title: 'Explorador', description: 'Comece 3 cursos diferentes', metric: 'coursesStarted', target: 3 },
  { id: 'first-course', icon: '🏆', title: 'Primeiro Curso', description: 'Conclua um curso inteiro', metric: 'coursesCompleted', target: 1 },
  { id: 'three-courses', icon: '👑', title: 'Colecionador de Cursos', description: 'Conclua 3 cursos', metric: 'coursesCompleted', target: 3 },
  { id: 'first-certificate', icon: '🎓', title: 'Diplomado', description: 'Conquiste seu primeiro certificado', metric: 'certificates', target: 1 },
];

export const defaultSettings = {
  fullName: 'Sarah Martinez',
  email: 'sarah.martinez@email.com',
  bio: 'Desenvolvedora apaixonada por aprender',
  language: 'Português (Brasil)',
  timezone: 'GMT-3 (Brasília)',
  videoQuality: 'Auto',
  autoplay: true,
  notifications: [
    { key: 'email', label: 'Notificações por email', enabled: true },
    { key: 'reminders', label: 'Lembretes de aula', enabled: true },
    { key: 'updates', label: 'Atualizações de curso', enabled: false },
    { key: 'achievements', label: 'Conquistas e certificados', enabled: true },
  ],
  privacy: [
    { key: 'publicProfile', label: 'Perfil público', enabled: false },
    { key: 'showProgress', label: 'Mostrar progresso', enabled: true },
    { key: 'allowMessages', label: 'Permitir mensagens', enabled: true },
  ],
};

/**
 * Mapeia a chave de gradiente para um valor CSS `linear-gradient`
 * (aplicado via style inline nas páginas — sem dependência de Tailwind).
 */
export const thumbnailGradients = {
  'gradient-1': 'linear-gradient(to bottom right, #6366f1, #9333ea)',
  'gradient-2': 'linear-gradient(to bottom right, #3b82f6, #0891b2)',
  'gradient-3': 'linear-gradient(to bottom right, #10b981, #0d9488)',
  'gradient-4': 'linear-gradient(to bottom right, #ec4899, #e11d48)',
  'gradient-5': 'linear-gradient(to bottom right, #f59e0b, #ea580c)',
  'gradient-6': 'linear-gradient(to bottom right, #8b5cf6, #9333ea)',
};
