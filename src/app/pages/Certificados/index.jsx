import { Award, Download, Share2, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { getCertificates } from '../../../services/api';
import { useAsync } from '../../../hooks/useAsync';
import styles from './Certificados.module.css';

/** Abre uma janela com o certificado formatado e dispara a impressão (salvar como PDF). */
function downloadCertificate(cert) {
  const win = window.open('', '_blank', 'width=900,height=650');
  if (!win) {
    toast.error('Permita pop-ups para baixar o certificado.');
    return;
  }
  win.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Certificado - ${cert.courseName}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: system-ui, -apple-system, sans-serif; padding: 48px; }
          .cert { border: 8px solid #4F46E5; border-radius: 16px; padding: 56px; text-align: center;
                  background: linear-gradient(135deg, #f5f3ff, #ffffff); }
          .badge { font-size: 14px; letter-spacing: 3px; text-transform: uppercase; color: #4F46E5; }
          h1 { font-size: 34px; margin: 24px 0 8px; color: #0F172A; }
          .subtitle { color: #4B5563; margin-bottom: 32px; }
          .course { font-size: 26px; font-weight: 700; color: #4F46E5; margin: 16px 0; }
          .meta { color: #4B5563; margin-top: 24px; line-height: 1.8; }
          .id { font-family: monospace; background: #F3F4F6; padding: 2px 8px; border-radius: 4px; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body onload="window.print()">
        <div class="cert">
          <p class="badge">Certificado de Conclusão</p>
          <h1>EduLearn</h1>
          <p class="subtitle">Certificamos que o(a) aluno(a) concluiu com êxito o curso</p>
          <p class="course">${cert.courseName}</p>
          <div class="meta">
            <div>Instrutor: ${cert.instructor}</div>
            <div>Concluído em: ${cert.completedDate}</div>
            <div>Carga horária: ${cert.hours} horas</div>
            <div>ID: <span class="id">${cert.certificateId}</span></div>
          </div>
        </div>
      </body>
    </html>
  `);
  win.document.close();
  win.focus();
}

async function shareCertificate(cert) {
  const text = `Conquistei o certificado do curso "${cert.courseName}" na EduLearn! (${cert.certificateId})`;
  const shareData = { title: 'Certificado EduLearn', text, url: window.location.href };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {
      // Usuário cancelou — sem feedback de erro.
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    toast.success('Link do certificado copiado!');
  } catch {
    toast.error('Não foi possível compartilhar o certificado.');
  }
}

export default function Certificados() {
  const { data: certificates, loading, error } = useAsync(() => getCertificates(), []);

  const totalHours = certificates?.reduce((acc, c) => acc + c.hours, 0) ?? 0;

  return (
    <div className={styles.page}>
      {/* Cabeçalho */}
      <div>
        <h1 className={styles.title}>Meus Certificados</h1>
        <p className={styles.subtitle}>Certificados dos cursos que você concluiu</p>
      </div>

      {/* Estatísticas */}
      <div className={styles.statsGrid}>
        <StatCard icon={Award} color="#22c55e" value={certificates?.length ?? 0} label="Certificados Obtidos" />
        <StatCard icon={Calendar} color="#a855f7" value={totalHours} label="Horas Certificadas" />
        <StatCard icon={Share2} color="#3b82f6" value={5} label="Compartilhamentos" />
      </div>

      {loading && <div className={styles.stateBox}>Carregando certificados...</div>}

      {error && !loading && <div className={styles.stateBoxError}>{error}</div>}

      {/* Lista de Certificados */}
      {!loading && !error && (
        <div className={styles.list}>
          {certificates?.map((cert) => (
            <div key={cert.id} className={styles.certCard}>
              <div className={styles.certInner}>
                {/* Visualização do Certificado */}
                <div className={styles.certPreview}>
                  <div className={styles.previewInner}>
                    <div className={styles.previewBadge}>
                      <Award className={styles.previewBadgeIcon} />
                    </div>
                    <h3 className={styles.previewTitle}>Certificado de Conclusão</h3>
                    <div className={styles.previewRule}></div>
                  </div>
                </div>

                {/* Detalhes do Certificado */}
                <div className={styles.certDetails}>
                  <div className={styles.certDetailsInner}>
                    <div className={styles.certDetailsTop}>
                      <h3 className={styles.certCourse}>{cert.courseName}</h3>
                      <p className={styles.certInstructor}>Instrutor: {cert.instructor}</p>

                      <div className={styles.certMeta}>
                        <div className={styles.certMetaRow}>
                          <Calendar className={styles.certMetaIcon} />
                          <span>Concluído em: {cert.completedDate}</span>
                        </div>
                        <div className={styles.certMetaRow}>
                          <span className={styles.certMetaStrong}>ID:</span>
                          <code className={styles.certCode}>{cert.certificateId}</code>
                        </div>
                        <div className={styles.certMetaRow}>
                          <span className={styles.certMetaStrong}>Carga Horária:</span>
                          <span>{cert.hours} horas</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.certActions}>
                      <button onClick={() => downloadCertificate(cert)} className={styles.downloadButton}>
                        <Download className={styles.actionIcon} />
                        Baixar PDF
                      </button>
                      <button onClick={() => shareCertificate(cert)} className={styles.shareButton}>
                        <Share2 className={styles.actionIcon} />
                        Compartilhar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Estado vazio */}
          {certificates?.length === 0 && (
            <div className={styles.emptyCard}>
              <div className={styles.emptyIcon}>
                <Award className={styles.emptyIconSvg} />
              </div>
              <h3 className={styles.emptyTitle}>Nenhum certificado ainda</h3>
              <p className={styles.emptyText}>Complete seus cursos para ganhar certificados</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, color, value, label }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statInner}>
        <div className={styles.statIcon} style={{ backgroundColor: color }}>
          <Icon className={styles.statIconSvg} />
        </div>
        <div>
          <h3 className={styles.statValue}>{value}</h3>
          <p className={styles.statLabel}>{label}</p>
        </div>
      </div>
    </div>
  );
}
