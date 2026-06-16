/**
 * INTEGRANTE 3 — EmptyState
 *
 * Tela vazia genérica exibida quando não há itens para listar.
 * Hoje está duplicada inline em Dashboard ("sem conquistas") e MeusCursos
 * ("nenhum curso encontrado").
 *
 * PROPS:
 *  icon         React.ElementType | null   Componente de ícone Lucide (opcional)
 *  title        string                     Título principal (ex: 'Nenhum curso encontrado')
 *  description  string                     Texto de apoio
 *  actionLabel  string | null              Texto do botão/link de ação (opcional)
 *  actionTo     string | null              Rota do Link (usado somente se actionLabel for informado)
 *
 * COMO USAR (pelo Integrante 1):
 *  import { EmptyState } from '../components';
 *  import { BookOpen } from 'lucide-react';
 *  <EmptyState
 *    icon={BookOpen}
 *    title="Nenhum curso encontrado"
 *    description='Nada corresponde a "React".'
 *    actionLabel="Ver todos os cursos"
 *    actionTo="/cursos"
 *  />
 */

import { Link } from 'react-router';
import styles from './EmptyState.module.css';

export default function EmptyState({
  icon: Icon = null,
  title,
  description,
  actionLabel = null,
  actionTo = null,
}) {
  // TODO: implemente o JSX abaixo.
  // Dica: renderize Icon apenas se for diferente de null.
  // Renderize o Link apenas se actionLabel e actionTo forem informados.

  return (
    <div className={styles.wrap}>
      {Icon && (
        <div className={styles.iconWrap}>
          <Icon className={styles.icon} />
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className={styles.action}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
