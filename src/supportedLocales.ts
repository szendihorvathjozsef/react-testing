import { hu, enGB } from "date-fns/locale";

export type SupportedLocales = "hu" | "en";

export type LocaleOptions = {
  longDateFormat: string;
};

const supportedLocales: { [key in SupportedLocales]: Locale } = {
  hu: hu,
  en: enGB,
};

export const localeAttributes: { [key in SupportedLocales]: LocaleOptions } = {
  hu: { longDateFormat: "yyyy. MMMM. dd." },
  en: {
    longDateFormat: "dd-MMMM-yyyy",
  },
};

export const FALLBACK_LANGUAGE = "hu";

export default supportedLocales;
