import { hu, enGB } from "date-fns/locale";

export type SupportedLocales = "hu" | "en";

export type LocaleOptions = {
  longDateFormat: string;
  phoneFormat: string;
  phonePlaceholder: string;
};

const supportedLocales: { [key in SupportedLocales]: Locale } = {
  hu: hu,
  en: enGB,
};

export const localeAttributes: { [key in SupportedLocales]: LocaleOptions } = {
  hu: {
    longDateFormat: "yyyy. MMMM. dd.",
    phoneFormat: "+36 (00) 000-0000",
    phonePlaceholder: "+36 30 123-4567",
  },
  en: {
    longDateFormat: "dd-MMMM-yyyy",
    phoneFormat: "",
    phonePlaceholder: "",
  },
};

export const FALLBACK_LANGUAGE = "hu";

export default supportedLocales;
