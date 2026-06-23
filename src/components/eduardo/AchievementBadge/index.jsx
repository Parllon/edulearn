/**
 * INTEGRANTE 3 — AchievementBadge
 *
 * Badge de conquista com dois modos de exibição:
 *  - compact=true  → linha horizontal compacta (usado no Dashboard)
 *  - compact=false → card vertical completo com barra de progresso (usado em Conquistas)
 *
 * PROPS:
 *  icon        string     Emoji da conquista (ex: '🏆', '🎯', '🔥')
 *  title       string     Nome da conquista
 *  description string     Descrição do critério
 *  unlocked    boolean    Se a conquista foi desbloqueada
 *  compact     boolean    true = modo Dashboard  |  false = modo Conquistas (padrão)
 *
 *  -- somente quando compact=false --
 *  current   number       Progresso atual do usuário (ex: 7)
 *  target    number       Meta para desbloquear (ex: 10)
 *  progress  number       Percentual 0–100 (pré-calculado pela api.js)
 *
 * COMO USAR (pelo Integrante 1):
 *  import { AchievementBadge } from '../components';
 *  <AchievementBadge icon="🏆" title="Primeiro Curso" description="..." unlocked compact />
 *  <AchievementBadge icon="🔥" title="Dedicado" description="..." unlocked={false}
 *    current={7} target={10} progress={70} />
 */

import { Lock } from 'lucide-react';
import styles from './AchievementBadge.module.css';

export default function AchievementBadge({
  icon,
  title,
  description,
  unlocked,
  compact = false,
  current,
  target,
  progress = 0,
}) {
  /* --- Modo compacto (Dashboard) --- */
  if (compact) {
    return (
      <div className={styles.compact}>
        <span className={styles.compactIcon}>{icon}</span>
        <div>
          <p className={styles.compactTitle}>{title}</p>
          <p className={styles.compactDesc}>{description}</p>
        </div>
      </div>
    );
  }

  /* --- Modo card completo (Conquistas) --- */
  return (
    <div className={`${styles.card} ${unlocked ? styles.cardUnlocked : styles.cardLocked}`}>
      <div className={styles.head}>
        <span className={`${styles.badge} ${unlocked ? styles.badgeUnlocked : styles.badgeLocked}`}>
          {icon}
        </span>
        {unlocked ? (
          <span className={styles.tagUnlocked}>Desbloqueada</span>
        ) : (
          <span className={styles.tagLocked}>
            <Lock className={styles.lockIcon} />
            Bloqueada
          </span>
        )}
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>

      <div className={styles.progress}>
        <div className={styles.progressRow}>
          <span>{current} / {target}</span>
          <span>{progress}%</span>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
