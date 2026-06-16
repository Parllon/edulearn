import { Search, Bell, Moon, Sun, Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Switch from '../ui/Switch';
import { useTheme } from '../../context/ThemeProvider';
import { useAuth } from '../../context/AuthProvider';
import { getInitials, useSettings } from '../../context/SettingsProvider';
import styles from './Header.module.css';

export default function Header({ onToggleNav }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const { settings } = useSettings();

  const handleSearch = (e) => {
    e.preventDefault();
    const term = query.trim();
    navigate(term ? `/cursos?q=${encodeURIComponent(term)}` : '/cursos');
  };

  const firstName = settings.fullName.trim().split(/\s+/)[0] || 'Você';

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        {/* Botão do menu (mobile) */}
        <button
          type="button"
          onClick={onToggleNav}
          aria-label="Abrir menu"
          className={styles.menuButton}
        >
          <Menu className={styles.menuIcon} />
        </button>

        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <span className={styles.logoIconText}>EL</span>
          </div>
          <span className={styles.logoText}>EduLearn</span>
        </Link>

        {/* Barra de Busca */}
        <form onSubmit={handleSearch} className={styles.form}>
          <div className={styles.searchWrap}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar cursos, aulas ou tópicos..."
              aria-label="Buscar cursos"
              className={styles.searchInput}
            />
          </div>
        </form>

        {/* Seção Direita */}
        <div className={styles.right}>
          {/* Notificações */}
          <button type="button" aria-label="Notificações" className={styles.notifButton}>
            <Bell className={styles.notifIcon} />
            <span className={styles.notifDot}></span>
          </button>

          {/* Modo Escuro */}
          <div className={styles.themeWrap}>
            {isDark ? (
              <Sun className={styles.themeIcon} />
            ) : (
              <Moon className={styles.themeIcon} />
            )}
            <Switch
              checked={isDark}
              onCheckedChange={toggleTheme}
              aria-label="Alternar modo escuro"
            />
          </div>

          {/* Avatar do Usuário */}
          <Link to="/configuracoes" className={styles.avatarLink}>
            <span className={styles.firstName}>{firstName}</span>
            <div className={styles.avatar}>
              <span className={styles.avatarText}>{getInitials(settings.fullName)}</span>
            </div>
          </Link>

          {/* Sair */}
          <button type="button" onClick={logout} aria-label="Sair" className={styles.logoutButton}>
            <LogOut className={styles.logoutIcon} />
          </button>
        </div>
      </div>
    </header>
  );
}
