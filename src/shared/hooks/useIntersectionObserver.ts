import * as React from "react";

type Params<T, K> = {
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number;
  root?: React.RefObject<T>;
  target?: React.RefObject<T>;
  onIntersect: () => void;
};

export default function useIntersectionObserver<
  Root extends HTMLElement,
  Target extends HTMLElement
>({
  enabled = true,
  rootMargin = "0px",
  threshold = 1.0,
  root,
  target,
  onIntersect,
}: Params<Root, Target>) {
  React.useEffect(() => {
    if (!enabled) {
      return;
    }
    console.log(target, enabled);

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [enabled, target?.current]); // eslint-disable-line react-hooks/exhaustive-deps
}
