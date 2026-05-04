import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationUZ from "./json/uz.json";
import translationEN from "./json/en.json";
import translationRU from "./json/ru.json";

const resources = {
  uz: { translation: translationUZ },
  en: { translation: translationEN },
  ru: { translation: translationRU },
};

i18n
  .use(LanguageDetector) // Tilni avtomatik aniqlash
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "uz", // Agar til topilmasa, standart til
    interpolation: { escapeValue: false },
  });

export default i18n;
