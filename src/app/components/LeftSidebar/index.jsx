import { LayoutDashboard, BookOpen, Trophy, Award, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import styles from './LeftSidebar.module.css';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: BookOpen, label: 'Meus Cursos', path: '/cursos' },
  { icon: Trophy, label: 'Conquistas', path: '/conquistas' },
  { icon: Award, label: 'Certificados', path: '/certificados' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

export default function LeftSidebar({ open = false, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Fundo escurecido (apenas no drawer mobile) */}
      {open && <div className={styles.overlay} onClick={onClose}></div>}

      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path === '/cursos' && location.pathname.startsWith('/assistir'));
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : styles.navLinkInactive}`}
              >
                <Icon className={styles.navIcon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Card de Progresso */}
        <div className={styles.progressCard}>
          <h4 className={styles.progressTitle}>Progresso de Aprendizado</h4>
          <div className={styles.progressBody}>
            <div className={styles.progressRow}>
              <span className={styles.progressLabel}>Conclusão do Curso</span>
              <span className={styles.progressValue}>68%</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill}></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
