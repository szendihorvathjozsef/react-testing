import * as React from "react";
import IMask from "imask/esm/imask";

export type MaskedEvent = {
  name?: string;
  maskedValue: any;
  unMaskedValue: any;
};

type InputMask = {
  onAccept?: (
    event: MaskedEvent,
    ref: React.RefObject<HTMLInputElement>
  ) => void;
  onComplete?: (
    event: MaskedEvent,
    ref: React.RefObject<HTMLInputElement>
  ) => void;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type Props = {
  options: IMask.AnyMaskedOptions;
  inputRef?: (ref: HTMLInputElement | null) => void;
} & InputMask;

const InputMask = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    options,
    onAccept,
    onComplete,
    name,
    inputRef: propInputRef,
    ...rest
  } = props;
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const maskRef = React.useRef<IMask.InputMask<any> | null>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      maskRef.current = IMask(inputRef.current, options);
    }

    return () => {
      if (maskRef.current) {
        maskRef.current.destroy();
        maskRef.current = null;
      }
    };
  }, [options]);

  React.useEffect(() => {
    if (maskRef?.current && inputRef?.current) {
      if (onAccept) {
        maskRef.current.on("accept", () => {
          onAccept(
            {
              name,
              maskedValue: maskRef.current?.value,
              unMaskedValue: maskRef.current?.unmaskedValue,
            },
            inputRef
          );
        });
      }
      if (onComplete) {
        maskRef.current.on("complete", () => {
          if (inputRef.current?.value) {
            inputRef.current.value = maskRef.current?.unmaskedValue as string;
            console.log("WOW");
          }
          onComplete(
            {
              name,
              maskedValue: maskRef.current?.value,
              unMaskedValue: maskRef.current?.unmaskedValue,
            },
            inputRef
          );
        });
      }
    }
  }, [name, onAccept, onComplete]);

  function combineRef(el: HTMLInputElement) {
    inputRef.current = el;
    if (propInputRef) {
      propInputRef(el);
    }
    if (typeof ref === "function") {
      ref(el);
    } else if (ref !== null) {
      ref.current = el;
    }
  }

  return <input {...rest} ref={combineRef} name={name} />;
});

export default InputMask;
