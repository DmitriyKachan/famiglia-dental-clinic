'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { translations, Locale, Translations } from './translations';

export interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export interface I18nProviderProps {
  children?: ReactNode;
  initialLocale?: Locale;
}

export function I18nProvider({ children, initialLocale = 'ua' }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const t = useMemo<Translations>(() => {
    return translations[locale];
  }, [locale]);

  const value = useMemo<I18nContextType>(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, t]
  );

  return React.createElement(I18nContext.Provider, { value }, children);
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
