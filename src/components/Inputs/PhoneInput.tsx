import * as React from "react";
import InputMask from "./InputMask";
import useLocale from "shared/hooks/useLocale";

type Props = {
  inputRef?: (ref: HTMLInputElement | null) => void;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function PhoneInput({ inputRef, type, ...other }: Props) {
  const locale = useLocale();

  return (
    <InputMask
      {...other}
      type="tel"
      options={{
        mask: locale.phoneFormat,
      }}
      placeholder={locale.phonePlaceholder}
      ref={inputRef}
    />
  );
}
