/**
 * INTEGRANTE 3 — FilterPills
 *
 * Grupo de pills/abas de filtro. Usado em MeusCursos para filtrar
 * por Todos / Em Andamento / Concluídos / Não Iniciados.
 *
 * PROPS:
 *  options   string[]                  Lista de rótulos das opções
 *  value     string                    Opção atualmente selecionada
 *  onChange  (value: string) => void   Callback ao clicar numa pill
 *
 * COMO USAR (pelo Integrante 1):
 *  import { FilterPills } from '../components';
 *  const [cat, setCat] = useState('Todos');
 *  <FilterPills
 *    options={['Todos', 'Em Andamento', 'Concluídos', 'Não Iniciados']}
 *    value={cat}
 *    onChange={setCat}
 *  />
 */

import styles from './FilterPills.module.css';

export default function FilterPills({ options = [], value, onChange }) {
  // TODO: implemente o JSX abaixo.
  // Dica: aplique styles.pillActive quando option === value, styles.pillIdle caso contrário.

  return (
    <div className={styles.row}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`${styles.pill} ${option === value ? styles.pillActive : styles.pillIdle}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
