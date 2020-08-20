import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { format as dateFormat } from "date-fns";
import { hu } from "date-fns/locale";
import supportedLocales, {
  SupportedLocales,
  FALLBACK_LANGUAGE,
} from "./supportedLocales";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ["common", "validation"],
    supportedLngs: ["hu"],
    fallbackLng: FALLBACK_LANGUAGE,

    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        let language = supportedLocales[lng as SupportedLocales];

        if (format === "datetime") {
          return dateFormat(new Date(value), "Pp", {
            locale: lng ? language : hu,
          });
        }
        if (format === "date") {
          return dateFormat(new Date(value), "P", {
            locale: lng ? language : hu,
          });
        }
        if (format === "time") {
          return dateFormat(new Date(value), "p", {
            locale: lng ? language : hu,
          });
        }

        return value;
      },
    },
  });

export default i18n;
