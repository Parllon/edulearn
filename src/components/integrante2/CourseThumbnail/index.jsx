/**
 * INTEGRANTE 2 — CourseThumbnail
 *
 * Bloco visual de capa do curso: gradiente de cor + ícone ou botão de play.
 * Usado isolado em cards onde não cabe o CourseCard completo.
 *
 * PROPS:
 *  gradient       string              Chave do gradiente: 'gradient-1' ... 'gradient-6'
 *  size           'sm'|'md'|'lg'     Controla a altura do bloco (via CSS Module)
 *  showPlayButton boolean             Se true, exibe botão de play centralizado
 *  courseId       number | null       Se informado, envolve em <Link to="/assistir/:id">
 *
 * COMO USAR (pelo Integrante 1):
 *  import { CourseThumbnail } from '../components';
 *  <CourseThumbnail gradient="gradient-3" size="md" showPlayButton courseId={2} />
 */

import { Play, BookOpen } from 'lucide-react';
import { Link } from 'react-router';
import { thumbnailGradients } from '../../../data/mockData';
import styles from './CourseThumbnail.module.css';

export default function CourseThumbnail({
  gradient,
  size = 'md',
  showPlayButton = false,
  courseId = null,
}) {
  // TODO: implemente o bloco visual aqui.
  // Dica: aplique thumbnailGradients[gradient] como backgroundImage via style inline.
  // Use styles[size] para variar a altura conforme o tamanho.

  const inner = (
    <div
      className={`${styles.thumb} ${styles[size]}`}
      style={{ backgroundImage: thumbnailGradients[gradient] }}
    >
      {/* TODO: exiba <Play /> se showPlayButton=true, <BookOpen /> caso contrário */}
      {showPlayButton ? (
        <div className={styles.playBtn}>
          <Play className={styles.playIcon} fill="currentColor" />
        </div>
      ) : (
        <BookOpen className={styles.bookIcon} />
      )}
    </div>
  );

  if (courseId != null) {
    return (
      <Link to={`/assistir/${courseId}`} className={styles.link}>
        {inner}
      </Link>
    );
  }

  return inner;
}
