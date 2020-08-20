import { useTranslation } from "react-i18next";
import {
  LocaleOptions,
  SupportedLocales,
  localeAttributes,
} from "supportedLocales";

export default function useLocale(): LocaleOptions {
  const { i18n } = useTranslation();
  const language = i18n.language as SupportedLocales;

  return localeAttributes[language];
}
