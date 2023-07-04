import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import { LANG_EN, LANG_RU } from "helpers/constants";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: [LANG_EN, LANG_RU],
    fallbackLng: LANG_EN,
    debug: true,
    detection: {
      order: ["sessionStorage", "navigator"],
      caches: ["sessionStorage"],
      lookupSessionStorage: "i18nextLng",
    },
    backend: {
      loadPath: "/locales/{{ns}}/{{lng}}.json",
    },
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
      format: (value, format, lang) => {
        if (format === "age") {
          if (lang === LANG_EN) {
            if (value === 0) {
              return `${value} year`;
            } else {
              return `${value} years`;
            }
          } else {
            const mod = value % 10;
            if (mod === 0 || mod > 4) {
              return `${value} лет`;
            } else if (mod === 1) {
              return `${value} год`;
            } else {
              return `${value} года`;
            }
          }
        }

        return value;
      },
    },
  });

export default i18next;
