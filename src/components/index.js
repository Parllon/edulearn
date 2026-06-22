/**
 * Ponto central de exportação dos componentes dos integrantes.
 * O Integrante 1 importa daqui — nunca de caminhos internos.
 *
 * COMO USAR:
 *   import { CourseCard, ProgressBar, StatCard, CourseThumbnail } from '../components';
 *   import { AchievementBadge, SearchBar, FilterPills, EmptyState } from '../components';
 *   import { CourseCard, AchievementBadge } from '../components'; // misturado
 */

/* ── Integrante 2 ─────────────────────────────────────────────── */
export { default as CourseCard }      from './integrante2/CourseCard';
export { default as CourseThumbnail } from './integrante2/CourseThumbnail';
export { default as ProgressBar }     from './integrante2/ProgressBar';
export { default as StatCard }        from './integrante2/StatCard';

/* ── Integrante 3 ─────────────────────────────────────────────── */
export { default as AchievementBadge } from './eduardo/AchievementBadge';
export { default as SearchBar }        from './eduardo/SearchBar';
export { default as FilterPills }      from './eduardo/FilterPills';
export { default as EmptyState }       from './eduardo/EmptyState';
