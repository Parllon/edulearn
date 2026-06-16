# Guia de Colaboração — EduLearn

Repositório: https://github.com/Parllon/edulearn

---

## Divisão de Responsabilidades

| Integrante | Responsabilidade | Pasta de trabalho |
|---|---|---|
| **Integrante 1** | Core do app: rotas, páginas, estados globais, integração final | `src/app/` |
| **Integrante 2** | Componentes de Curso & Dados | `src/components/integrante2/` |
| **Integrante 3** | Componentes de Feedback & Navegação | `src/components/integrante3/` |

> **Regra principal:** cada integrante mexe **somente** na sua pasta. Nada fora dela.

---

## Componentes por Integrante

### Integrante 2 — `src/components/integrante2/`

| Componente | Arquivo | Descrição |
|---|---|---|
| `CourseCard` | `CourseCard/index.jsx` | Card de curso (Dashboard + MeusCursos) |
| `CourseThumbnail` | `CourseThumbnail/index.jsx` | Bloco visual de capa com gradiente |
| `ProgressBar` | `ProgressBar/index.jsx` | Barra de progresso genérica |
| `StatCard` | `StatCard/index.jsx` | Card de estatística do Dashboard |

### Integrante 3 — `src/components/integrante3/`

| Componente | Arquivo | Descrição |
|---|---|---|
| `AchievementBadge` | `AchievementBadge/index.jsx` | Badge de conquista (Dashboard + Conquistas) |
| `SearchBar` | `SearchBar/index.jsx` | Campo de busca reutilizável |
| `FilterPills` | `FilterPills/index.jsx` | Pills de filtro (MeusCursos) |
| `EmptyState` | `EmptyState/index.jsx` | Tela vazia genérica |

---

## Setup Inicial (Integrantes 2 e 3)

Execute estes comandos uma única vez:

```bash
# 1. Clone o repositório
git clone https://github.com/Parllon/edulearn.git
cd edulearn

# 2. Instale as dependências
npm install

# 3. Rode o projeto para confirmar que está funcionando
npm run dev
```

Acesse `http://localhost:5173` e confirme que a plataforma abre sem erros.

---

## Workflow Git — Passo a Passo

### Integrante 2

```bash
# 1. Garanta que está na main atualizada
git checkout main
git pull origin main

# 2. Crie sua branch
git checkout -b feature/ui-integrante2

# 3. Desenvolva seus componentes em:
#    src/components/integrante2/

# 4. Quando terminar, adicione SOMENTE seus arquivos
git add src/components/integrante2/

# 5. Confirme o que vai ser commitado (não deve aparecer nada fora da sua pasta)
git status

# 6. Faça o commit
git commit -m "feat(ui): componentes integrante 2"

# 7. Envie sua branch para o GitHub
git push -u origin feature/ui-integrante2

# 8. Avise o Integrante 1 que terminou
```

---

### Integrante 3

```bash
# 1. Garanta que está na main atualizada
git checkout main
git pull origin main

# 2. Crie sua branch
git checkout -b feature/ui-integrante3

# 3. Desenvolva seus componentes em:
#    src/components/integrante3/

# 4. Quando terminar, adicione SOMENTE seus arquivos
git add src/components/integrante3/

# 5. Confirme o que vai ser commitado (não deve aparecer nada fora da sua pasta)
git status

# 6. Faça o commit
git commit -m "feat(ui): componentes integrante 3"

# 7. Envie sua branch para o GitHub
git push -u origin feature/ui-integrante3

# 8. Avise o Integrante 1 que terminou
```

---

## Merge Final — Integrante 1

Execute quando os integrantes 2 e 3 avisarem que terminaram:

```bash
# 1. Atualize sua main local
git checkout main
git pull origin main

# 2. Merge do Integrante 2
git fetch origin
git merge feature/ui-integrante2

# 3. Merge do Integrante 3
git merge feature/ui-integrante3

# 4. Envie o resultado para o GitHub
git push origin main

# 5. (Opcional) Delete as branches após o merge
git branch -d feature/ui-integrante2
git branch -d feature/ui-integrante3
git push origin --delete feature/ui-integrante2
git push origin --delete feature/ui-integrante3
```

> Como cada integrante trabalhou em pastas completamente separadas, os merges acima não geram conflitos.

---

## Como o Integrante 1 Importa os Componentes

Após o merge, os componentes ficam disponíveis via importação centralizada:

```js
// Uma única linha de importação — sem caminhos internos
import { CourseCard, ProgressBar, StatCard, CourseThumbnail } from '../components';
import { AchievementBadge, SearchBar, FilterPills, EmptyState } from '../components';

// Exemplo de uso nas páginas
<CourseCard variant="dashboard" id={1} title="React" progress={60} />
<StatCard icon={BookOpen} value={3} label="Cursos em andamento" iconBgColor="#6366f120" />
<SearchBar value={query} onChange={setQuery} placeholder="Buscar cursos..." />
<EmptyState icon={BookOpen} title="Nenhum curso encontrado" description="Ajuste os filtros." />
```

---

## Fluxo Visual

```
GitHub (main)
    │
    ├── clone ──► Integrante 2  →  edita integrante2/  →  push feature/ui-integrante2
    │                                                                │
    ├── clone ──► Integrante 3  →  edita integrante3/  →  push feature/ui-integrante3
    │                                                                │
    └── Integrante 1:  merge int2  →  merge int3  →  push main  ◄──┘
```

---

## Dúvidas Frequentes

**Posso commitar outros arquivos junto?**
Não. Use sempre `git add src/components/integrante2/` (ou `integrante3/`) para garantir que só seus arquivos entram no commit.

**Preciso entender o resto do projeto para desenvolver meu componente?**
Não. Cada componente recebe tudo que precisa via props. As props e um exemplo de uso estão documentados no topo de cada arquivo `index.jsx`.

**Como vejo meu componente funcionando?**
Rode `npm run dev` e edite o arquivo `src/app/pages/Dashboard/index.jsx` temporariamente para importar e renderizar seu componente. Desfaça a alteração antes de commitar.

**E se eu travar em algo?**
Avise o Integrante 1. Não tente corrigir arquivos fora da sua pasta.
