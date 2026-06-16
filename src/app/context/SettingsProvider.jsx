import { createContext, useContext, useEffect, useState } from 'react';
import { getUserSettings, saveUserSettings } from '../../services/api';
import { defaultSettings } from '../../data/mockData';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getUserSettings()
      .then((s) => {
        if (active) setSettings(s);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const save = async (next) => {
    const saved = await saveUserSettings(next);
    setSettings(saved);
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, save }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings deve ser usado dentro de <SettingsProvider>');
  return ctx;
}

/** Gera as iniciais (até 2 letras) a partir do nome completo. */
export function getInitials(fullName) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
