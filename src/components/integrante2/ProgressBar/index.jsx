/**
 * INTEGRANTE 2 — ProgressBar
 *
 * Barra de progresso genérica. Elimina a duplicação que existe hoje em 4 páginas
 * (Dashboard, MeusCursos, Conquistas, LeftSidebar).
 *
 * PROPS:
 *  value       number           Porcentagem de 0 a 100
 *  showLabel   boolean          Se true, exibe rótulo + valor acima da barra
 *  label       string           Texto do lado esquerdo (padrão: 'Progresso')
 *  size        'sm'|'md'        'sm' → 4px de altura  |  'md' → 8px (padrão)
 *
 * COMO USAR (pelo Integrante 1):
 *  import { ProgressBar } from '../components';
 *  <ProgressBar value={75} showLabel label="Conclusão" size="sm" />
 */

import styles from './ProgressBar.module.css';

export default function ProgressBar({
  value = 0,
  showLabel = false,
  label = 'Progresso',
  size = 'md',
}) {
  const clamped = Math.min(100, Math.max(0, value));

  // TODO: implemente o JSX abaixo.
  // Dica: use styles.track + styles[size] na div da trilha,
  //       e style={{ width: `${clamped}%` }} na div de preenchimento.

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
