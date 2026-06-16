import { Play, Pause, Clock, User, Check, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import styles from './VideoPlayer.module.css';

const tabs = ['Visão Geral', 'Recursos', 'Anotações', 'Perguntas'];

export default function VideoPlayer({
  courseTitle,
  instructor,
  description,
  lesson,
  moduleLabel,
  onToggleComplete,
}) {
  const [activeTab, setActiveTab] = useState('Visão Geral');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={styles.wrapper}>
      {/* Container do Player */}
      <div className={styles.card}>
        <div className={styles.stage}>
          {/* Fundo/Preview */}
          <div className={styles.stageOverlay}></div>

          {/* Botão Play/Pause (reprodução simulada) */}
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
            className={styles.playButton}
          >
            {isPlaying ? (
              <Pause className={styles.playIcon} fill="currentColor" />
            ) : (
              <Play className={`${styles.playIcon} ${styles.playIconOffset}`} fill="currentColor" />
            )}
          </button>

          {isPlaying && <div className={styles.playingBadge}>Reproduzindo…</div>}

          {/* Duração */}
          {lesson && (
            <div className={styles.durationBadge}>
              <Clock className={styles.durationIcon} />
              <span className={styles.durationText}>{lesson.duration}</span>
            </div>
          )}
        </div>

        {/* Informações do Vídeo */}
        <div className={styles.info}>
          <div>
            <h1 className={styles.lessonTitle}>{lesson?.title ?? courseTitle}</h1>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <User className={styles.metaIcon} />
                <span>{instructor}</span>
              </div>
              <span>•</span>
              <span>Atualizado em Maio 2026</span>
              {moduleLabel && (
                <>
                  <span>•</span>
                  <span className={styles.metaModule}>{moduleLabel}</span>
                </>
              )}
            </div>
          </div>

          <p className={styles.description}>{description}</p>

          {/* Marcar como concluída */}
          {lesson && onToggleComplete && (
            <button
              type="button"
              onClick={onToggleComplete}
              className={`${styles.completeButton} ${
                lesson.completed ? styles.completeButtonDone : styles.completeButtonPending
              }`}
            >
              {lesson.completed ? (
                <>
                  <CheckCircle2 className={styles.completeIcon} />
                  Aula concluída
                </>
              ) : (
                <>
                  <Check className={styles.completeIcon} />
                  Marcar como concluída
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Seção de Abas */}
      <div className={styles.card}>
        {/* Navegação das Abas */}
        <div className={styles.tabBar}>
          <div className={styles.tabList}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : styles.tabIdle}`}
              >
                {tab}
                {activeTab === tab && <div className={styles.tabIndicator}></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo das Abas */}
        <div className={styles.tabContent}>
          {activeTab === 'Visão Geral' && (
            <div className={styles.overview}>
              <div>
                <h3 className={styles.overviewTitle}>O que você vai aprender</h3>
                <ul className={styles.learnList}>
                  {[
                    'Compreender a API React Hooks e seus benefícios sobre componentes de classe',
                    'Implementar useState para gerenciamento de estado local de componentes',
                    'Usar useEffect para efeitos colaterais e gerenciamento de ciclo de vida',
                    'Melhores práticas e padrões comuns para hooks em aplicações de produção',
                  ].map((item) => (
                    <li key={item} className={styles.learnItem}>
                      <div className={styles.learnBullet}></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.prereq}>
                <h3 className={styles.overviewTitle}>Pré-requisitos</h3>
                <p className={styles.prereqText}>
                  Compreensão básica de JavaScript e fundamentos do React incluindo componentes e props.
                </p>
              </div>
            </div>
          )}
          {activeTab !== 'Visão Geral' && (
            <div className={styles.placeholder}>
              O conteúdo de {activeTab} será exibido aqui
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
