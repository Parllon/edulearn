import { Trophy, Lock } from 'lucide-react';
import { getAchievements } from '../../../services/api';
import { useAsync } from '../../../hooks/useAsync';
import styles from './Conquistas.module.css';

export default function Conquistas() {
  const { data, loading, error } = useAsync(() => getAchievements(), []);

  if (loading) {
    return <div className={styles.stateInfo}>Carregando conquistas...</div>;
  }
  if (error || !data) {
    return <div className={styles.stateError}>{error ?? 'Não foi possível carregar as conquistas.'}</div>;
  }

  const { achievements, unlocked, total } = data;
  const overall = total === 0 ? 0 : Math.round((unlocked / total) * 100);

  return (
    <div className={styles.page}>
      {/* Cabeçalho */}
      <div>
        <h1 className={styles.title}>Minhas Conquistas</h1>
        <p className={styles.subtitle}>Desbloqueie conquistas conforme avança nos seus cursos</p>
      </div>

      {/* Resumo */}
      <div className={styles.summary}>
        <div className={styles.summaryIcon}>
          <Trophy className={styles.summaryIconSvg} />
        </div>
        <div className={styles.summaryBody}>
          <div className={styles.summaryTop}>
            <span className={styles.summaryLabel}>Progresso geral</span>
            <span className={styles.summaryValue}>
              {unlocked} de {total} desbloqueadas
            </span>
          </div>
          <div className={styles.summaryTrack}>
            <div className={styles.summaryFill} style={{ width: `${overall}%` }}></div>
          </div>
        </div>
      </div>

      {/* Grade de Conquistas */}
      <div className={styles.grid}>
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`${styles.card} ${ach.unlocked ? styles.cardUnlocked : styles.cardLocked}`}
          >
            <div className={styles.cardHead}>
              <div className={`${styles.badge} ${ach.unlocked ? styles.badgeUnlocked : styles.badgeLocked}`}>
                <span className={styles.badgeEmoji}>{ach.icon}</span>
              </div>
              {ach.unlocked ? (
                <span className={styles.tagUnlocked}>Desbloqueada</span>
              ) : (
                <span className={styles.tagLocked}>
                  <Lock className={styles.tagLockIcon} />
                  Bloqueada
                </span>
              )}
            </div>

            <h3 className={styles.cardTitle}>{ach.title}</h3>
            <p className={styles.cardDesc}>{ach.description}</p>

            <div className={styles.cardProgress}>
              <div className={styles.cardProgressRow}>
                <span>{ach.current} / {ach.target}</span>
                <span>{ach.progress}%</span>
              </div>
              <div className={styles.cardTrack}>
                <div className={styles.cardFill} style={{ width: `${ach.progress}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
