/**
 * INTEGRANTE 2 — CourseCard
 *
 * Card de curso reutilizável. Aparece em duas páginas:
 *  - Dashboard  → variant="dashboard"  (compacto, mostra nextLesson)
 *  - MeusCursos → variant="list"       (completo, mostra rating/alunos/duração)
 *
 * PROPS:
 *  id              number              ID do curso — usado no Link /assistir/:id
 *  title           string              Título do curso
 *  instructor      string              Nome do instrutor
 *  thumbnail       string              'gradient-1' ... 'gradient-6'
 *  progress        number              0–100
 *  variant         'dashboard'|'list'  Controla quais informações exibir
 *
 *  -- somente em variant="dashboard" --
 *  completedLessons  number
 *  totalLessons      number
 *  nextLesson        string | null
 *
 *  -- somente em variant="list" --
 *  rating    number
 *  students  number
 *  duration  string
 *  level     string
 *
 * COMO USAR (pelo Integrante 1):
 *  import { CourseCard } from '../components';
 *  <CourseCard variant="dashboard" id={1} title="React" progress={60} ... />
 */

import { Play, Star, Clock } from 'lucide-react';
import { Link } from 'react-router';
import { thumbnailGradients } from '../../../data/mockData';
import styles from './CourseCard.module.css';

export default function CourseCard({
  id,
  title,
  instructor,
  thumbnail,
  progress = 0,
  variant = 'list',
  completedLessons,
  totalLessons,
  nextLesson,
  rating,
  students,
  duration,
  level,
}) {
  const ctaLabel =
    progress === 0 ? 'Começar Curso' : progress === 100 ? 'Revisar Curso' : 'Continuar';

  return (
    <div className={styles.card}>
      {/* Thumbnail com gradiente */}
      <div
        className={styles.thumb}
        style={{ backgroundImage: thumbnailGradients[thumbnail] }}
      >
        {variant === 'dashboard' && (
          <Link to={`/assistir/${id}`} className={styles.playBtn}>
            <Play className={styles.playIcon} fill="currentColor" />
          </Link>
        )}
      </div>

      {/* Corpo do card */}
      <div className={styles.body}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.instructor}>{instructor}</p>
        </div>

        {/* Meta — somente variant="list" */}
        {variant === 'list' && (
          <div className={styles.meta}>
            <Star className={styles.starIcon} fill="currentColor" />
            <span className={styles.metaStrong}>{rating}</span>
            <span>•</span>
            <span>{students?.toLocaleString('pt-BR')} alunos</span>
            <span>•</span>
            <Clock className={styles.metaIcon} />
            <span>{duration}</span>
            {level && <span className={styles.levelBadge}>{level}</span>}
          </div>
        )}

        {/* Barra de progresso */}
        {progress > 0 && (
          <div className={styles.progress}>
            <div className={styles.progressRow}>
              <span className={styles.progressLabel}>Progresso</span>
              <span className={styles.progressValue}>{progress}%</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            {variant === 'dashboard' && completedLessons != null && (
              <p className={styles.progressMeta}>
                {completedLessons} de {totalLessons} aulas
              </p>
            )}
          </div>
        )}

        {/* Próxima aula — somente variant="dashboard" */}
        {variant === 'dashboard' && nextLesson && (
          <div className={styles.nextLesson}>
            <p className={styles.nextLabel}>Próxima aula:</p>
            <Link to={`/assistir/${id}`} className={styles.nextLink}>
              {nextLesson}
              <Play className={styles.nextIcon} />
            </Link>
          </div>
        )}

        <Link to={`/assistir/${id}`} className={styles.cta}>
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
