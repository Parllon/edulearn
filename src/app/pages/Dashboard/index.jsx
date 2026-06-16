import { BookOpen, Clock, Award, TrendingUp, Play } from 'lucide-react';
import { Link } from 'react-router';
import { getDashboard } from '../../../services/api';
import { thumbnailGradients } from '../../../data/mockData';
import { useAsync } from '../../../hooks/useAsync';
import { useSettings } from '../../context/SettingsProvider';
import styles from './Dashboard.module.css';

const statIcons = {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
};

export default function Dashboard() {
  const { settings } = useSettings();
  const { data, loading, error } = useAsync(() => getDashboard(), []);

  const firstName = settings.fullName.trim().split(/\s+/)[0] || 'Você';

  if (loading) {
    return <div className={styles.stateInfo}>Carregando seu painel...</div>;
  }
  if (error || !data) {
    return <div className={styles.stateError}>{error ?? 'Não foi possível carregar o painel.'}</div>;
  }

  return (
    <div className={styles.page}>
      {/* Cabeçalho */}
      <div>
        <h1 className={styles.title}>Bem-vindo de volta, {firstName}! 👋</h1>
        <p className={styles.subtitle}>Continue seu aprendizado de onde você parou</p>
      </div>

      {/* Estatísticas */}
      <div className={styles.statsGrid}>
        {data.stats.map((stat) => {
          const Icon = statIcons[stat.icon];
          return (
            <div key={stat.label} className={styles.statCard}>
              <div className={styles.statTop}>
                <div className={styles.statIcon} style={{ backgroundColor: stat.color }}>
                  <Icon className={styles.statIconSvg} />
                </div>
              </div>
              <h3 className={styles.statValue}>{stat.value}</h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Cursos em Andamento */}
      <div>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Continuar Assistindo</h2>
          <Link to="/cursos" className={styles.sectionLink}>
            Ver todos os cursos
          </Link>
        </div>
        {data.coursesInProgress.length === 0 ? (
          <div className={styles.emptyBox}>
            Nenhum curso em andamento.{' '}
            <Link to="/cursos" className={styles.inlineLink}>Explore os cursos</Link>.
          </div>
        ) : (
          <div className={styles.coursesGrid}>
            {data.coursesInProgress.map((course) => (
              <div key={course.id} className={styles.courseCard}>
                {/* Thumbnail */}
                <div
                  className={styles.thumb}
                  style={{ backgroundImage: thumbnailGradients[course.thumbnail] }}
                >
                  <div className={styles.thumbOverlay}></div>
                  <Link to={`/assistir/${course.id}`} className={styles.thumbPlay}>
                    <Play className={styles.thumbPlayIcon} fill="currentColor" />
                  </Link>
                </div>

                {/* Conteúdo */}
                <div className={styles.courseBody}>
                  <div>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <p className={styles.courseInstructor}>{course.instructor}</p>
                  </div>

                  <div className={styles.progressBlock}>
                    <div className={styles.progressRow}>
                      <span className={styles.progressLabel}>Progresso</span>
                      <span className={styles.progressValue}>{course.progress}%</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <div className={styles.progressFill} style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <p className={styles.progressMeta}>
                      {course.completedLessons} de {course.totalLessons} aulas
                    </p>
                  </div>

                  {course.nextLesson && (
                    <div className={styles.nextLesson}>
                      <p className={styles.nextLessonLabel}>Próxima aula:</p>
                      <Link to={`/assistir/${course.id}`} className={styles.nextLessonLink}>
                        {course.nextLesson}
                        <Play className={styles.nextLessonIcon} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Conquistas Recentes */}
      <div>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Conquistas Desbloqueadas</h2>
          <Link to="/conquistas" className={styles.sectionLink}>
            Ver todas
          </Link>
        </div>
        <div className={styles.achievementsCard}>
          {data.achievements.length === 0 ? (
            <p className={styles.achievementsEmpty}>
              Você ainda não desbloqueou conquistas. Comece uma aula para ganhar a primeira! 🎯
            </p>
          ) : (
            <div className={styles.achievementsGrid}>
              {data.achievements.map((achievement) => (
                <div key={achievement.id} className={styles.achievement}>
                  <div className={styles.achievementIcon}>{achievement.icon}</div>
                  <div className={styles.achievementBody}>
                    <h4 className={styles.achievementTitle}>{achievement.title}</h4>
                    <p className={styles.achievementDate}>{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
