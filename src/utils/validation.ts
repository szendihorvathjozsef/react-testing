import i18n from "i18n";

export const INTEGER_FORMAT = /^[-+]?[0-9]+$/;

export const numberPattern = () => ({
  value: INTEGER_FORMAT,
  message: i18n.t("validation:invalidFormat", {
    subject: i18n.t("validation:caption.subject.number"),
  }),
});
