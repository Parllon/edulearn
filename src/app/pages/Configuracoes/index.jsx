import { User, Bell, Lock, Palette } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Switch from '../../components/ui/Switch';
import { useSettings } from '../../context/SettingsProvider';
import styles from './Configuracoes.module.css';

const languageOptions = ['Português (Brasil)', 'English (US)', 'Español'];
const timezoneOptions = ['GMT-3 (Brasília)', 'GMT-2 (Fernando de Noronha)', 'GMT (UTC)'];
const videoQualityOptions = ['Auto', '1080p', '720p', '480p'];

export default function Configuracoes() {
  const { settings, loading, save } = useSettings();
  const [draft, setDraft] = useState(settings);
  const [saving, setSaving] = useState(false);

  // Sincroniza o rascunho quando as configurações salvas carregam/mudam.
  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  const update = (key, value) => setDraft((prev) => ({ ...prev, [key]: value }));

  const toggleItem = (group, key, enabled) =>
    setDraft((prev) => ({
      ...prev,
      [group]: prev[group].map((item) => (item.key === key ? { ...item, enabled } : item)),
    }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await save(draft);
      toast.success('Configurações salvas com sucesso!');
    } catch {
      toast.error('Não foi possível salvar as configurações.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDraft(settings);
    toast.info('Alterações descartadas.');
  };

  if (loading) {
    return <div className={styles.stateInfo}>Carregando configurações...</div>;
  }

  return (
    <div className={styles.page}>
      {/* Cabeçalho */}
      <div>
        <h1 className={styles.title}>Configurações</h1>
        <p className={styles.subtitle}>Gerencie suas preferências e configurações da conta</p>
      </div>

      {/* Perfil */}
      <SectionCard title="Perfil" icon={User}>
        <Field label="Nome completo">
          <input
            type="text"
            value={draft.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            className={styles.input}
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={draft.email}
            onChange={(e) => update('email', e.target.value)}
            className={styles.input}
          />
        </Field>
        <Field label="Biografia">
          <textarea
            value={draft.bio}
            onChange={(e) => update('bio', e.target.value)}
            rows={3}
            className={`${styles.input} ${styles.textarea}`}
          />
        </Field>
      </SectionCard>

      {/* Notificações */}
      <SectionCard title="Notificações" icon={Bell}>
        {draft.notifications.map((item) => (
          <ToggleRow
            key={item.key}
            label={item.label}
            checked={item.enabled}
            onChange={(v) => toggleItem('notifications', item.key, v)}
          />
        ))}
      </SectionCard>

      {/* Privacidade */}
      <SectionCard title="Privacidade" icon={Lock}>
        {draft.privacy.map((item) => (
          <ToggleRow
            key={item.key}
            label={item.label}
            checked={item.enabled}
            onChange={(v) => toggleItem('privacy', item.key, v)}
          />
        ))}
      </SectionCard>

      {/* Preferências */}
      <SectionCard title="Preferências" icon={Palette}>
        <Field label="Idioma">
          <select value={draft.language} onChange={(e) => update('language', e.target.value)} className={styles.input}>
            {languageOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Fuso horário">
          <select value={draft.timezone} onChange={(e) => update('timezone', e.target.value)} className={styles.input}>
            {timezoneOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Qualidade de vídeo">
          <select
            value={draft.videoQuality}
            onChange={(e) => update('videoQuality', e.target.value)}
            className={styles.input}
          >
            {videoQualityOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <ToggleRow label="Reprodução automática" checked={draft.autoplay} onChange={(v) => update('autoplay', v)} />
      </SectionCard>

      {/* Ações */}
      <div className={styles.actions}>
        <button onClick={handleSave} disabled={saving} className={styles.saveButton}>
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
        <button onClick={handleCancel} disabled={saving} className={styles.cancelButton}>
          Cancelar
        </button>
      </div>

      {/* Zona de Perigo */}
      <div className={styles.dangerCard}>
        <div className={styles.dangerHead}>
          <h2 className={styles.dangerTitle}>Zona de Perigo</h2>
        </div>
        <div className={styles.dangerBody}>
          <DangerRow
            title="Desativar conta"
            description="Desative temporariamente sua conta. Você pode reativá-la a qualquer momento."
            buttonLabel="Desativar"
            buttonClass={styles.dangerSoft}
            onClick={() => toast.warning('Conta desativada (simulação).')}
          />
          <div className={styles.dangerDivider}>
            <DangerRow
              title="Excluir conta"
              description="Exclua permanentemente sua conta e todos os dados. Esta ação não pode ser desfeita."
              buttonLabel="Excluir"
              buttonClass={styles.dangerSolid}
              onClick={() => toast.error('Conta excluída (simulação).')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHead}>
        <div className={styles.sectionHeadInner}>
          <div className={styles.sectionIcon}>
            <Icon className={styles.sectionIconSvg} />
          </div>
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
      </div>
      <div className={styles.sectionContent}>{children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className={styles.toggleRow}>
      <span className={styles.toggleLabel}>{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function DangerRow({ title, description, buttonLabel, buttonClass, onClick }) {
  return (
    <div className={styles.dangerRow}>
      <div>
        <h3 className={styles.dangerRowTitle}>{title}</h3>
        <p className={styles.dangerRowDesc}>{description}</p>
      </div>
      <button onClick={onClick} className={`${styles.dangerButton} ${buttonClass}`}>
        {buttonLabel}
      </button>
    </div>
  );
}
