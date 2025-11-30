import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import arTranslation from "./locales/ar.json";

const resources = {
  en: { translation: enTranslation },
  ar: { translation: arTranslation },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // initial fallback
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export const setI18nLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
};

export default i18n;
