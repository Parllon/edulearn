/**
 * INTEGRANTE 3 — SearchBar
 *
 * Campo de busca reutilizável com ícone de lupa à esquerda.
 * Hoje está duplicado inline no Header e em MeusCursos.
 *
 * PROPS:
 *  value        string                   Valor atual do input (controlled)
 *  onChange     (value: string) => void  Callback — recebe a string, não o evento
 *  placeholder  string                   Texto do placeholder (padrão: 'Buscar...')
 *  className    string                   Classe extra opcional (ajuste de largura por contexto)
 *
 * COMO USAR (pelo Integrante 1):
 *  import { SearchBar } from '../components';
 *  const [q, setQ] = useState('');
 *  <SearchBar value={q} onChange={setQ} placeholder="Buscar cursos..." />
 */

import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar...',
  className = '',
}) {
  // TODO: implemente o JSX abaixo.
  // Dica: chame onChange(e.target.value) no evento onChange do input.

  return (
    <div className={`${styles.wrap} ${className}`}>
      <Search className={styles.icon} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={styles.input}
      />
    </div>
  );
}
