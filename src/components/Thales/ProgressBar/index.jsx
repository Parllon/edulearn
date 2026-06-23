import styles from './ProgressBar.module.css';

export default function ProgressBar({
  value = 0,
  showLabel = false,
  label = 'Progresso',
  size = 'md',
}) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={styles.wrapper}>
      {showLabel && (
        <div className={styles.labelRow}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>{clamped}%</span>
        </div>
      )}
      <div className={`${styles.track} ${styles[size]}`}>
        <div className={styles.fill} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
