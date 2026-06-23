# EduLearn — Plataforma de E-learning

Plataforma de cursos online (UI originada do Figma) construída com **React 18 + TypeScript +
Vite + Tailwind CSS v4 + React Router 7**. A aplicação é funcional: busca/filtros de cursos,
player com navegação e marcação de aulas concluídas, configurações persistidas, modo escuro e
certificados (baixar/compartilhar).

## Credenciais padrão

| Campo | Valor |
|-------|-------|
| Email | `demo@edulearn.com` |
| Senha | `demo123` |

O usuário é inserido automaticamente no `localStorage` na primeira execução. É possível criar novas contas pela tela de cadastro.

## Como rodar

```bash
npm install
npm run dev      # servidor de desenvolvimento (Vite)
npm run build    # build de produção
npm run preview  # pré-visualiza o build
npm run typecheck # checagem de tipos (tsc --noEmit)
```

## Estrutura de Arquivos

```
src/
├── main.jsx                        # Ponto de entrada React
├── app/
│   ├── App.jsx                     # Componente raiz (rotas + providers)
│   ├── App.module.css
│   ├── components/
│   │   ├── Header/
│   │   │   ├── index.jsx           # Barra de navegação superior
│   │   │   └── Header.module.css
│   │   ├── LeftSidebar/
│   │   │   ├── index.jsx           # Menu lateral de navegação
│   │   │   └── LeftSidebar.module.css
│   │   ├── RightSidebar/
│   │   │   ├── index.jsx           # Lista de módulos/aulas do curso
│   │   │   └── RightSidebar.module.css
│   │   ├── VideoPlayer/
│   │   │   ├── index.jsx           # Player de vídeo simulado
│   │   │   └── VideoPlayer.module.css
│   │   ├── Footer/
│   │   │   ├── index.jsx
│   │   │   └── Footer.module.css
│   │   └── ui/
│   │       └── Switch/
│   │           ├── index.jsx       # Toggle (Radix UI)
│   │           └── Switch.module.css
│   ├── context/
│   │   ├── AuthProvider.jsx        # Login / cadastro / logout (localStorage)
│   │   ├── ThemeProvider.jsx       # Modo claro/escuro
│   │   └── SettingsProvider.jsx    # Configurações de perfil do usuário
│   └── pages/
│       ├── Dashboard/              # Página inicial com estatísticas
│       ├── MeusCursos/             # Listagem e busca de cursos
│       ├── AssistirAula/           # Player + navegação de aulas
│       ├── Certificados/           # Certificados gerados (download/share)
│       ├── Conquistas/             # Badges desbloqueadas
│       ├── Configuracoes/          # Perfil, notificações, privacidade
│       ├── Login/
│       └── Cadastro/
├── components/
│   ├── index.js                    # Barrel export de todos os componentes UI
│   ├── eduardo/                    # Componentes de Eduardo
│   │   ├── AchievementBadge/       # Badge de conquista do usuário
│   │   ├── EmptyState/             # Tela vazia (sem resultados)
│   │   ├── FilterPills/            # Filtros em formato de pills
│   │   └── SearchBar/              # Barra de pesquisa
│   └── Thales/                     # Componentes de Thales
│       ├── CourseCard/             # Card de exibição de curso
│       ├── CourseThumbnail/        # Miniatura/thumbnail do curso
│       ├── ProgressBar/            # Barra de progresso
│       └── StatCard/               # Card de estatística
├── data/
│   └── mockData.js                 # Fonte única: cursos, conquistas, settings padrão
├── hooks/
│   └── useAsync.js                 # Hook genérico { data, loading, error }
├── services/
│   ├── api.js                      # Camada de serviço (mock → pronto para REST)
│   ├── auth.js                     # Autenticação mock (localStorage)
│   └── storage.js                  # Helpers de localStorage com namespace
└── styles/
    ├── index.css
    ├── fonts.css
    ├── globals.css
    ├── tailwind.css
    └── theme.css                   # CSS vars + dark mode (oklch)
```

## Arquitetura

- **`src/data/mockData.js`** — fonte única de dados (cursos, módulos/aulas, certificados,
  conquistas, configurações padrão).
- **`src/services/api.js`** — camada de serviço assíncrona estilo `fetch`, com latência simulada,
  tratamento de erros e progresso derivado. Sobrepõe overrides do usuário vindos do `localStorage`.
- **`src/services/storage.js`** — helpers de `localStorage` (tema, configurações, progresso de aulas).
- **`src/hooks/useAsync.js`** — hook padrão de carregamento (`{ data, loading, error }`).
- **`src/app/context/`** — `ThemeProvider` (modo escuro persistido) e `SettingsProvider`
  (perfil/configurações compartilhados).

### Backend / API

Hoje os dados vêm de um mock local. A camada de serviço foi desenhada para apontar a um backend
REST real: defina `VITE_API_URL` (veja `.env.example`) e troque os corpos das funções de
`src/services/api.ts` por chamadas `fetch(\`${API_URL}/...\`)` mantendo as mesmas assinaturas.

> Projeto original: https://www.figma.com/design/UIxrhDgZDsuScHQS1Hp7TE/E-learning-Platform-UI-Design
