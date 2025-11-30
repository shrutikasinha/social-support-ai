import React, { createContext, useState } from "react";
import { setI18nLanguage } from "../localization/i18n";

type Language = "en" | "ar";

interface LanguageContextType {
  lang: Language;
  setLang: () => void;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
});

const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [locale, setLocale] = useState<Language>("en");

  const setLang = () => {
    setLocale(locale === "en" ? "ar" : "en");
    setI18nLanguage(locale === "en" ? "ar" : "en")
  };
  return (
    <LanguageContext.Provider value={{ lang: locale, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
