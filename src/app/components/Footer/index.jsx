import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>
          © 2026 EduLearn. Todos os direitos reservados.
        </p>
        <div className={styles.links}>
          <a href="#" className={styles.link}>Termos</a>
          <a href="#" className={styles.link}>Privacidade</a>
          <a href="#" className={styles.link}>Ajuda</a>
        </div>
      </div>
    </footer>
  );
}
