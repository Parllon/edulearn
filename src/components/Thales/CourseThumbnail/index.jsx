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
