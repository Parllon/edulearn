/**
 * INTEGRANTE 2 — StatCard
 *
 * Card de estatística do Dashboard: ícone colorido + valor grande + rótulo.
 * Hoje o Dashboard renderiza 4 desses cards inline (cursos em andamento,
 * horas assistidas, certificados, sequência de dias).
 *
 * PROPS:
 *  icon         React.ElementType   Componente de ícone Lucide (ex: BookOpen, Clock)
 *  value        string | number     Valor principal exibido em destaque (ex: '3', '12h')
 *  label        string              Descrição abaixo do valor (ex: 'Cursos em andamento')
 *  iconBgColor  string              Cor de fundo do círculo do ícone (ex: '#6366f120')
 *
 * COMO USAR (pelo Integrante 1):
 *  import { StatCard } from '../components';
 *  import { BookOpen } from 'lucide-react';
 *  <StatCard icon={BookOpen} value={3} label="Cursos em andamento" iconBgColor="#6366f120" />
 */

import styles from './StatCard.module.css';

export default function StatCard({ icon: Icon, value, label, iconBgColor }) {
  // TODO: implemente o JSX abaixo.
  // Dica: aplique iconBgColor como backgroundColor via style inline no div do ícone.

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
