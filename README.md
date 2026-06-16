# EduLearn — Plataforma de E-learning

Plataforma de cursos online (UI originada do Figma) construída com **React 18 + TypeScript +
Vite + Tailwind CSS v4 + React Router 7**. A aplicação é funcional: busca/filtros de cursos,
player com navegação e marcação de aulas concluídas, configurações persistidas, modo escuro e
certificados (baixar/compartilhar).

## Como rodar

```bash
npm install
npm run dev      # servidor de desenvolvimento (Vite)
npm run build    # build de produção
npm run preview  # pré-visualiza o build
npm run typecheck # checagem de tipos (tsc --noEmit)
```

## Arquitetura

- **`src/data/mockData.ts`** — fonte única de dados (cursos, módulos/aulas, certificados,
  conquistas, configurações padrão) e tipos.
- **`src/services/api.ts`** — camada de serviço assíncrona estilo `fetch`, com latência simulada,
  tratamento de erros e progresso derivado. Sobrepõe overrides do usuário vindos do `localStorage`.
- **`src/services/storage.ts`** — helpers de `localStorage` (tema, configurações, progresso de aulas).
- **`src/hooks/useAsync.ts`** — hook padrão de carregamento (`{ data, loading, error }`).
- **`src/app/context/`** — `ThemeProvider` (modo escuro persistido) e `SettingsProvider`
  (perfil/configurações compartilhados).

### Backend / API

Hoje os dados vêm de um mock local. A camada de serviço foi desenhada para apontar a um backend
REST real: defina `VITE_API_URL` (veja `.env.example`) e troque os corpos das funções de
`src/services/api.ts` por chamadas `fetch(\`${API_URL}/...\`)` mantendo as mesmas assinaturas.

> Projeto original: https://www.figma.com/design/UIxrhDgZDsuScHQS1Hp7TE/E-learning-Platform-UI-Design
