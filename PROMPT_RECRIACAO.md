# Prompt para Recriação da Plataforma EduLearn

## Visão Geral
Crie uma plataforma moderna de e-learning/cursos online chamada "EduLearn" usando React, TypeScript, Tailwind CSS v4 e React Router. A aplicação deve ser totalmente em português brasileiro (PT-BR) e seguir um design system específico com layout em 5 seções principais.

## Stack Tecnológica
- React 18.3.1
- TypeScript
- Tailwind CSS v4
- React Router v7
- Lucide React (ícones)
- Radix UI (componentes de UI)
- Vite (build tool)

## Sistema de Cores (OBRIGATÓRIO)
Estas cores devem ser usadas exatamente como especificado:

```css
/* Cores Principais */
--primary: #4F46E5;           /* Deep Indigo/Purple - cor principal */
--primary-hover: #4338CA;     /* Variação hover do primary */
--text-primary: #0F172A;      /* Dark Slate Gray - texto principal */
--background: #F4F4F5;        /* Light Gray/Zinc - fundo da página */
--surface: #FFFFFF;           /* Branco - cards e containers */

/* Cores de Suporte */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;

/* Cores de Status */
--success: #10B981;           /* Verde para conclusões */
--warning: #F59E0B;           /* Laranja para alertas */
--error: #EF4444;             /* Vermelho para erros */

/* Gradientes */
--gradient-primary: linear-gradient(to bottom right, #4F46E5, #7C3AED);
--gradient-secondary: linear-gradient(to bottom right, #3B82F6, #06B6D4);
--gradient-tertiary: linear-gradient(to bottom right, #10B981, #14B8A6);
```

## Estrutura de Layout (5 Seções)

### 1. Header (Topo - Fixo)
**Altura:** 64px (h-16)
**Background:** Branco (#FFFFFF)
**Border:** border-b border-gray-200
**Shadow:** shadow-sm
**Position:** sticky top-0 z-50

**Conteúdo (da esquerda para direita):**
- **Logo:** 
  - Quadrado 32x32px com fundo #4F46E5 e cantos arredondados (rounded-lg)
  - Iniciais "EL" em branco, negrito
  - Texto "EduLearn" ao lado, font-semibold, text-lg, cor #0F172A
  
- **Barra de Busca (centralizada, max-width: 32rem):**
  - Input com ícone de lupa (Search) à esquerda
  - Placeholder: "Buscar cursos, aulas ou tópicos..."
  - Background: gray-50, border: gray-200, rounded-full
  - Altura: 44px (h-11)
  - Focus: ring-2 ring-[#4F46E5]

- **Seção Direita:**
  - Botão de notificações (Bell icon) com badge vermelho
  - Toggle de modo escuro (Moon icon + Switch)
  - Avatar do usuário: círculo com gradiente (#4F46E5 to #7C3AED), iniciais "SM", nome "Sarah M."

### 2. Left Sidebar (Navegação - Fixo)
**Largura:** 256px (w-64)
**Background:** Branco (#FFFFFF)
**Border:** border-r border-gray-200
**Height:** calc(100vh - 64px)
**Position:** sticky top-16

**Menu de Navegação (padding: p-4, espaçamento: space-y-1):**

Items do menu (cada um):
- Dashboard (LayoutDashboard icon) - rota: "/"
- Meus Cursos (BookOpen icon) - rota: "/cursos"
- Certificados (Award icon) - rota: "/certificados"
- Configurações (Settings icon) - rota: "/configuracoes"

**Estilo dos botões:**
- Inativo: text-gray-600, hover:bg-gray-50, hover:text-[#0F172A]
- Ativo: bg-[#4F46E5], text-white, shadow-md shadow-indigo-200
- Padding: px-4 py-3
- Border-radius: rounded-xl
- Ícones: w-5 h-5

**Card de Progresso (margin: mx-4 mt-6):**
- Background: gradient from-indigo-50 to-purple-50
- Border: border-indigo-100
- Título: "Progresso de Aprendizado"
- Texto: "Conclusão do Curso"
- Porcentagem: 68% em #4F46E5
- Barra de progresso: altura 8px (h-2), fundo branco, preenchimento #4F46E5

### 3. Main Content Area (Central - Scrollable)
**Width:** flex-1
**Background:** #F4F4F5
**Overflow:** overflow-y-auto
**Padding:** p-6
**Max-width:** 1400px (centralizado)

Esta área muda conforme a rota ativa.

### 4. Right Sidebar (Currículo - Apenas na página de assistir aula)
**Largura:** 320px (w-80)
**Background:** Branco (#FFFFFF)
**Border:** border-l border-gray-200
**Height:** calc(100vh - 64px)
**Position:** sticky top-16
**Overflow:** overflow-y-auto

**Conteúdo:**
- Cabeçalho: "Conteúdo do Curso"
- Subtítulo: "10 aulas • 1h 56m no total"
- Accordion com módulos do curso

**Módulos (usando Radix UI Accordion):**

Módulo 1 - "Começando com React":
- Aula 1: "Introdução ao Curso" - 3:24 - ✓ concluída
- Aula 2: "Configurando seu Ambiente" - 8:15 - ✓ concluída  
- Aula 3: "Introdução ao React Hooks" - 12:45 - ▶ reproduzindo (fundo indigo-50)
- Aula 4: "Construindo seu Primeiro Componente" - 15:30 - ○ não iniciada

Módulo 2 - "Gerenciamento Avançado de Estado":
- Aula 5: "Visão Geral da Context API" - 10:20
- Aula 6: "Hook useReducer" - 14:35
- Aula 7: "Hooks Personalizados" - 11:50

Módulo 3 - "Otimização de Performance":
- Aula 8: "React.memo e useMemo" - 13:15
- Aula 9: "Hook useCallback" - 9:40
- Aula 10: "Estratégias de Code Splitting" - 16:25

**Estilo do Accordion:**
- Header com ChevronDown/ChevronRight
- Barra de progresso em cada módulo
- Checkboxes verdes (✓) para aulas concluídas
- Ícone de play (#4F46E5) para aula atual
- Círculo vazio para aulas não iniciadas

### 5. Footer (Rodapé)
**Background:** Branco (#FFFFFF)
**Border:** border-t border-gray-200
**Padding:** py-4 px-6
**Position:** mt-auto

**Conteúdo:**
- Esquerda: "© 2026 EduLearn. Todos os direitos reservados."
- Direita: Links "Termos" | "Privacidade" | "Ajuda"
- Text color: text-gray-500
- Hover: text-[#4F46E5]

## Páginas da Aplicação

### Página 1: Dashboard (/)

**Cabeçalho:**
- Título: "Bem-vindo de volta, Sarah! 👋" (text-3xl, font-bold)
- Subtítulo: "Continue seu aprendizado de onde você parou"

**Grid de Estatísticas (4 cards):**

Card 1:
- Ícone: BookOpen (bg-blue-500, white)
- Valor: "3"
- Label: "Cursos em Andamento"

Card 2:
- Ícone: Clock (bg-purple-500, white)
- Valor: "24.5"
- Label: "Horas Assistidas"

Card 3:
- Ícone: Award (bg-green-500, white)
- Valor: "2"
- Label: "Certificados"

Card 4:
- Ícone: TrendingUp (bg-orange-500, white)
- Valor: "7 dias"
- Label: "Sequência Atual"

**Seção "Continuar Assistindo":**
Grid 3 colunas (responsive) com cards de cursos:

Curso 1:
- Título: "React Completo: Do Básico ao Avançado"
- Instrutor: "Dra. Emily Chen"
- Thumbnail: gradient indigo-500 to purple-600
- Progresso: 68%
- 28 de 42 aulas
- Próxima aula: "Introdução ao React Hooks"
- Botão: "Continuar" (bg-[#4F46E5], link para /assistir/1)

Curso 2:
- Título: "TypeScript para Desenvolvedores React"
- Instrutor: "Prof. Marcus Silva"
- Thumbnail: gradient blue-500 to cyan-600
- Progresso: 35%
- 10 de 28 aulas
- Próxima aula: "Tipos Genéricos e Utilitários"

Curso 3:
- Título: "Node.js e APIs RESTful"
- Instrutor: "Ana Rodrigues"
- Thumbnail: gradient emerald-500 to teal-600
- Progresso: 52%
- 18 de 35 aulas
- Próxima aula: "Autenticação com JWT"

**Seção "Conquistas Recentes":**
Grid 3 colunas com conquistas:
- 🎯 "Primeira Semana Completa" - 2 dias atrás
- 📚 "10 Lições Concluídas" - 5 dias atrás
- 🔥 "Sequência de 5 Dias" - 1 semana atrás

### Página 2: Meus Cursos (/cursos)

**Cabeçalho:**
- Título: "Meus Cursos"
- Subtítulo: "Gerencie e acompanhe seu progresso em todos os cursos"

**Barra de Filtros e Busca:**
- Input de busca com ícone Search
- Botão "Filtros" com ícone Filter
- Pills de categorias: "Todos" (ativo), "Em Andamento", "Concluídos", "Não Iniciados"

**Lista de Cursos (Grid 2 colunas):**

Exibir 6 cursos no formato horizontal:
1. React Completo (68% progresso)
2. TypeScript (35% progresso)
3. Node.js e APIs RESTful (52% progresso)
4. Design System e Component Library (0% - "Começar Curso")
5. Testes Automatizados com Jest (0%)
6. Deploy e CI/CD com GitHub Actions (100% - "Revisar Curso")

**Cada card contém:**
- Thumbnail lateral (gradient colorido, ícone BookOpen)
- Rating com estrela (4.6-4.9)
- Número de alunos
- Duração total
- Barra de progresso (se iniciado)
- Botão de ação (Começar/Continuar/Revisar)

### Página 3: Assistir Aula (/assistir/:id)

**Layout especial:** Sem padding interno, conteúdo vai até as bordas

**Player de Vídeo:**
- Aspect ratio 16:9
- Background: gradient gray-800 to gray-900
- Overlay: gradient indigo-900/50 to purple-900/50
- Botão de play central: círculo branco 80x80px, sombra forte
- Badge de duração: "12:45" no canto inferior direito

**Informações do Vídeo:**
- Título: "Introdução ao React Hooks e Gerenciamento de Estado"
- Instrutor: "Dra. Emily Chen"
- Data: "Atualizado em Maio 2026"
- Badge: "Módulo 1 • Aula 3"
- Descrição: parágrafo explicativo sobre a aula

**Sistema de Abas:**
Tabs: "Visão Geral" | "Recursos" | "Anotações" | "Perguntas"

**Conteúdo da aba "Visão Geral":**

"O que você vai aprender":
- Compreender a API React Hooks e seus benefícios sobre componentes de classe
- Implementar useState para gerenciamento de estado local de componentes
- Usar useEffect para efeitos colaterais e gerenciamento de ciclo de vida
- Melhores práticas e padrões comuns para hooks em aplicações de produção

"Pré-requisitos":
- Compreensão básica de JavaScript e fundamentos do React incluindo componentes e props

**Right Sidebar:**
(Conforme especificado na seção 4)

### Página 4: Certificados (/certificados)

**Grid de Estatísticas (3 cards):**
- Card 1: Award icon verde, "2" Certificados Obtidos
- Card 2: Calendar icon roxo, "20" Horas Certificadas  
- Card 3: Share2 icon azul, "5" Compartilhamentos

**Lista de Certificados:**

Certificado 1:
- Preview: gradient indigo-500 via purple-500 to pink-500
- Ícone Award branco centralizado
- Curso: "Fundamentos de JavaScript Moderno"
- Instrutor: "Prof. João Silva"
- Concluído em: "15 de Março, 2026"
- ID: CERT-2026-001245
- Carga horária: 12 horas
- Botões: "Baixar PDF" (primary) | "Compartilhar" (secondary)

Certificado 2:
- Curso: "CSS Avançado e Animações"
- Instrutor: "Maria Costa"
- Concluído em: "28 de Fevereiro, 2026"
- ID: CERT-2026-000892
- Carga horária: 8 horas

### Página 5: Configurações (/configuracoes)

**Seções em cards separados:**

**1. Perfil (User icon):**
- Nome completo: "Sarah Martinez" (input text)
- Email: "sarah.martinez@email.com" (input text)
- Biografia: "Desenvolvedora apaixonada por aprender" (textarea)

**2. Notificações (Bell icon):**
- Notificações por email (toggle ON)
- Lembretes de aula (toggle ON)
- Atualizações de curso (toggle OFF)
- Conquistas e certificados (toggle ON)

**3. Privacidade (Lock icon):**
- Perfil público (toggle OFF)
- Mostrar progresso (toggle ON)
- Permitir mensagens (toggle ON)

**4. Preferências (Palette icon):**
- Idioma: "Português (Brasil)" (select)
- Fuso horário: "GMT-3 (Brasília)" (select)
- Qualidade de vídeo: "Auto" (select)
- Reprodução automática (toggle ON)

**Botões de Ação:**
- "Salvar Alterações" (bg-[#4F46E5])
- "Cancelar" (bg-gray-100)

**Zona de Perigo (border-red-200, bg-red-50):**
- "Desativar conta" - botão vermelho claro
- "Excluir conta" - botão vermelho escuro

## Componentes de UI (Radix UI)

Use Radix UI para:
- Switch (toggle de modo escuro e configurações)
- Accordion (módulos do curso no sidebar direito)
- Tabs (abas no player de vídeo)

## Sistema de Rotas (React Router)

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/cursos" element={<MeusCursos />} />
    <Route path="/assistir/:id" element={<AssistirAula />} />
    <Route path="/certificados" element={<Certificados />} />
    <Route path="/configuracoes" element={<Configuracoes />} />
  </Routes>
</BrowserRouter>
```

**Importante:** A página /assistir/:id não deve ter o padding interno padrão e deve exibir o Right Sidebar.

## Estilos e Design System

**Espaçamentos:**
- Seções: gap-6
- Cards: p-6
- Botões: px-4 py-3 ou px-6 py-2
- Container principal: max-w-[1400px]

**Tipografia:**
- Títulos de página: text-3xl font-bold text-[#0F172A]
- Subtítulos de página: text-gray-600
- Títulos de cards: text-xl font-bold text-[#0F172A]
- Corpo de texto: text-gray-600
- Labels: text-sm font-medium text-[#0F172A]

**Bordas:**
- Cards: rounded-xl
- Botões primários: rounded-lg
- Botão de busca: rounded-full
- Inputs: rounded-lg
- Avatares: rounded-full

**Sombras:**
- Cards: shadow-md
- Cards hover: shadow-lg
- Botão ativo: shadow-md shadow-indigo-200
- Botão de play: shadow-2xl

**Transições:**
- Todos os elementos interativos: transition-all ou transition-colors
- Duração padrão: 150-300ms

## Responsividade

**Breakpoints:**
- Mobile: Layout em coluna única
- Tablet (md): Grid 2 colunas
- Desktop (lg): Grid 3 colunas
- XL: Grid 3-4 colunas

**Sidebar:**
- Mobile: Esconder ou menu hamburguer
- Desktop: Sempre visível

## Funcionalidades Interativas

1. **Navegação ativa:** Highlight do menu atual
2. **Hover states:** Todos os botões e links
3. **Focus states:** Inputs com ring-2 ring-[#4F46E5]
4. **Accordion:** Abertura/fechamento suave dos módulos
5. **Tabs:** Troca de conteúdo com highlight
6. **Progress bars:** Animação de preenchimento
7. **Badges:** Notificações com ponto vermelho
8. **Links:** Navegação entre páginas sem reload

## Dados de Exemplo

Use dados realistas em português brasileiro para:
- Nomes de instrutores brasileiros
- Títulos de cursos em PT-BR
- Datas no formato brasileiro
- Números formatados com locale pt-BR

## Requisitos Finais

✅ Aplicação 100% em português brasileiro
✅ Cores exatas conforme especificado (#4F46E5, #0F172A, #F4F4F5)
✅ Layout de 5 seções funcionando perfeitamente
✅ Todas as 5 páginas implementadas
✅ Rotas funcionais com React Router
✅ Design moderno SaaS/dashboard
✅ Componentes reutilizáveis
✅ Responsivo para mobile/tablet/desktop
✅ Transições e animações suaves
✅ Acessibilidade básica (labels, aria-labels)
✅ Performance otimizada

## Estrutura de Arquivos

```
src/
├── app/
│   ├── App.tsx (rotas principais)
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── LeftSidebar.tsx
│   │   ├── RightSidebar.tsx
│   │   ├── VideoPlayer.tsx
│   │   ├── Footer.tsx
│   │   └── ui/
│   │       └── switch.tsx
│   └── pages/
│       ├── Dashboard.tsx
│       ├── MeusCursos.tsx
│       ├── AssistirAula.tsx
│       ├── Certificados.tsx
│       └── Configuracoes.tsx
└── styles/
    └── theme.css (variáveis de cores)
```

---

**IMPORTANTE:** Siga este prompt exatamente. Cores, medidas e textos devem corresponder precisamente ao especificado. Esta é uma plataforma profissional de e-learning e o design deve refletir qualidade e atenção aos detalhes.
