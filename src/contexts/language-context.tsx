
'use client';

import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { TranslationKey, createTranslateFunction } from '@/lib/translations';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, params?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('id');

  const t = useMemo(() => {
    const translateFn = createTranslateFunction(language);
    const tProxy = (key: TranslationKey, params?: { [key: string]: string | number }) => translateFn(key, params);
    tProxy.language = language;
    return tProxy;
  }, [language]);


  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
