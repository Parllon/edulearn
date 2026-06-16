import styles from './StatCard.module.css';

export default function StatCard({ icon: Icon, value, label, iconBgColor }) {

  return (
    <div className={styles.card}>
      <div className={styles.iconWrap} style={{ backgroundColor: iconBgColor }}>
        {Icon && <Icon className={styles.icon} />}
      </div>
      <h3 className={styles.value}>{value}</h3>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
