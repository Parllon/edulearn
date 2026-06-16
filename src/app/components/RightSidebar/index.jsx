import { ChevronDown, ChevronRight, Check, Play } from 'lucide-react';
import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import styles from './RightSidebar.module.css';

/** Soma durações no formato "mm:ss" (ou "h:mm:ss") e retorna um rótulo legível. */
function totalDurationLabel(modules) {
  let seconds = 0;
  for (const m of modules) {
    for (const l of m.lessons) {
      const parts = l.duration.split(':').map(Number);
      if (parts.some(Number.isNaN)) continue;
      seconds += parts.reduce((acc, n) => acc * 60 + n, 0);
    }
  }
  const h = Math.floor(seconds / 3600);
  const min = Math.round((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${min}m` : `${min}m`;
}

export default function RightSidebar({ modules, currentLessonId, onSelectLesson }) {
  const moduleWithCurrent = modules.find((m) =>
    m.lessons.some((l) => l.id === currentLessonId),
  );
  const [openModules, setOpenModules] = useState([
    `module-${moduleWithCurrent?.id ?? modules[0]?.id ?? 1}`,
  ]);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.container}>
        <div className={styles.headerWrap}>
          <h2 className={styles.title}>Conteúdo do Curso</h2>
          <p className={styles.subtitle}>
            {totalLessons} aulas • {totalDurationLabel(modules)} no total
          </p>
        </div>

        <Accordion.Root
          type="multiple"
          value={openModules}
          onValueChange={setOpenModules}
          className={styles.root}
        >
          {modules.map((module) => {
            const completedLessons = module.lessons.filter((l) => l.completed).length;
            const total = module.lessons.length;

            return (
              <Accordion.Item key={module.id} value={`module-${module.id}`} className={styles.item}>
                <Accordion.Header>
                  <Accordion.Trigger className={styles.trigger}>
                    <div className={styles.chevronWrap}>
                      {openModules.includes(`module-${module.id}`) ? (
                        <ChevronDown className={styles.chevron} />
                      ) : (
                        <ChevronRight className={styles.chevron} />
                      )}
                    </div>
                    <div className={styles.triggerBody}>
                      <h3 className={styles.moduleTitle}>Módulo {module.id}</h3>
                      <p className={styles.moduleSubtitle}>{module.title}</p>
                      <div className={styles.moduleProgressRow}>
                        <div className={styles.moduleProgressTrack}>
                          <div
                            className={styles.moduleProgressFill}
                            style={{ width: `${total === 0 ? 0 : (completedLessons / total) * 100}%` }}
                          ></div>
                        </div>
                        <span className={styles.moduleProgressCount}>
                          {completedLessons}/{total}
                        </span>
                      </div>
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className={styles.content}>
                  <div className={styles.lessonsWrap}>
                    {module.lessons.map((lesson, idx) => {
                      const isCurrent = lesson.id === currentLessonId;
                      const isLast = idx === module.lessons.length - 1;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onSelectLesson(lesson.id)}
                          className={[
                            styles.lessonButton,
                            isCurrent ? styles.lessonButtonCurrent : styles.lessonButtonIdle,
                            !isLast ? styles.lessonButtonDivider : '',
                          ].join(' ')}
                        >
                          {/* Checkbox / ícone de status */}
                          <div className={styles.statusWrap}>
                            {lesson.completed ? (
                              <div className={styles.statusDone}>
                                <Check className={styles.statusDoneIcon} strokeWidth={3} />
                              </div>
                            ) : isCurrent ? (
                              <div className={styles.statusCurrent}>
                                <Play className={styles.statusCurrentIcon} fill="currentColor" />
                              </div>
                            ) : (
                              <div className={styles.statusEmpty}></div>
                            )}
                          </div>

                          {/* Informações da aula */}
                          <div className={styles.lessonBody}>
                            <p
                              className={`${styles.lessonTitle} ${
                                isCurrent ? styles.lessonTitleCurrent : styles.lessonTitleIdle
                              }`}
                            >
                              {lesson.title}
                            </p>
                            <p className={styles.lessonDuration}>{lesson.duration}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      </div>
    </aside>
  );
}
