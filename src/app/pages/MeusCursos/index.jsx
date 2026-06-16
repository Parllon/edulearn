import { Search, Filter, BookOpen, Clock, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { getCourses } from '../../../services/api';
import { thumbnailGradients } from '../../../data/mockData';
import { useAsync } from '../../../hooks/useAsync';
import styles from './MeusCursos.module.css';

const categories = ['Todos', 'Em Andamento', 'Concluídos', 'Não Iniciados'];

function matchesCategory(course, category) {
  switch (category) {
    case 'Em Andamento':
      return course.progress > 0 && course.progress < 100;
    case 'Concluídos':
      return course.progress === 100;
    case 'Não Iniciados':
      return course.progress === 0;
    default:
      return true;
  }
}

export default function MeusCursos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [category, setCategory] = useState('Todos');

  const { data: courses, loading, error } = useAsync(() => getCourses(), []);

  const filtered = useMemo(() => {
    if (!courses) return [];
    const q = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesQuery =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.instructor.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q);
      return matchesQuery && matchesCategory(course, category);
    });
  }, [courses, query, category]);

  const handleSearchChange = (value) => {
    setSearchParams(value ? { q: value } : {}, { replace: true });
  };

  return (
    <div className={styles.page}>
      {/* Cabeçalho */}
      <div>
        <h1 className={styles.title}>Meus Cursos</h1>
        <p className={styles.subtitle}>Gerencie e acompanhe seu progresso em todos os cursos</p>
      </div>

      {/* Filtros e Busca */}
      <div className={styles.filterCard}>
        <div className={styles.filterRow}>
          {/* Busca */}
          <div className={styles.searchWrap}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar cursos..."
              aria-label="Buscar cursos"
              className={styles.searchInput}
            />
          </div>

          {/* Filtro (decorativo) */}
          <button className={styles.filterButton}>
            <Filter className={styles.filterButtonIcon} />
            Filtros
          </button>
        </div>

        {/* Categorias */}
        <div className={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`${styles.categoryPill} ${
                category === cat ? styles.categoryPillActive : styles.categoryPillIdle
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Estados de carregamento / erro / vazio */}
      {loading && <div className={styles.stateBox}>Carregando cursos...</div>}

      {error && !loading && <div className={styles.stateBoxError}>{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className={styles.emptyCard}>
          <div className={styles.emptyIcon}>
            <BookOpen className={styles.emptyIconSvg} />
          </div>
          <h3 className={styles.emptyTitle}>Nenhum curso encontrado</h3>
          <p className={styles.subtitle}>
            {query ? `Nada corresponde a "${query}".` : 'Ajuste os filtros para ver mais cursos.'}
          </p>
        </div>
      )}

      {/* Lista de Cursos */}
      {!loading && !error && filtered.length > 0 && (
        <div className={styles.coursesGrid}>
          {filtered.map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <div className={styles.courseInner}>
                {/* Thumbnail */}
                <div
                  className={styles.thumb}
                  style={{ backgroundImage: thumbnailGradients[course.thumbnail] }}
                >
                  <BookOpen className={styles.thumbIcon} />
                </div>

                {/* Conteúdo */}
                <div className={styles.courseBody}>
                  <div className={styles.courseTop}>
                    <div className={styles.courseHeader}>
                      <h3 className={styles.courseTitle}>{course.title}</h3>
                      <span className={styles.levelBadge}>{course.level}</span>
                    </div>

                    <p className={styles.courseInstructor}>{course.instructor}</p>

                    <div className={styles.courseMeta}>
                      <div className={styles.metaItem}>
                        <Star className={styles.starIcon} fill="currentColor" />
                        <span className={styles.metaStrong}>{course.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{course.students.toLocaleString('pt-BR')} alunos</span>
                      <span>•</span>
                      <div className={styles.metaItem}>
                        <Clock className={styles.metaIcon} />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {course.progress > 0 && (
                      <div className={styles.progressBlock}>
                        <div className={styles.progressRow}>
                          <span className={styles.progressLabel}>Progresso</span>
                          <span className={styles.progressValue}>{course.progress}%</span>
                        </div>
                        <div className={styles.progressTrack}>
                          <div className={styles.progressFill} style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link to={`/assistir/${course.id}`} className={styles.cta}>
                    {course.progress === 0
                      ? 'Começar Curso'
                      : course.progress === 100
                      ? 'Revisar Curso'
                      : 'Continuar'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
