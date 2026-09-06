'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Locale, UiMode } from '@/types';

type ModeContextType = {
  mode: UiMode;
  setMode: (mode: UiMode) => void;
  toggleMode: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<UiMode>('standard');
  const [locale, setLocaleState] = useState<Locale>('kk');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load persisted preferences
    const savedMode = localStorage.getItem('qorgan_ui_mode') as UiMode | null;
    const savedLocale = localStorage.getItem('qorgan_locale') as Locale | null;

    if (savedMode === 'junior' || savedMode === 'standard') {
      setModeState(savedMode);
      document.documentElement.setAttribute('data-mode', savedMode);
    } else {
      document.documentElement.setAttribute('data-mode', 'standard');
    }

    if (savedLocale === 'kk' || savedLocale === 'ru') {
      setLocaleState(savedLocale);
      document.documentElement.lang = savedLocale;
    } else {
      document.documentElement.lang = 'kk';
    }

    setMounted(true);
  }, []);

  const setMode = (newMode: UiMode) => {
    setModeState(newMode);
    localStorage.setItem('qorgan_ui_mode', newMode);
    document.documentElement.setAttribute('data-mode', newMode);
  };

  const toggleMode = () => {
    setMode(mode === 'standard' ? 'junior' : 'standard');
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('qorgan_locale', newLocale);
    document.documentElement.lang = newLocale;
  };

  const toggleLocale = () => {
    setLocale(locale === 'kk' ? 'ru' : 'kk');
  };

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        locale,
        setLocale,
        toggleLocale,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
