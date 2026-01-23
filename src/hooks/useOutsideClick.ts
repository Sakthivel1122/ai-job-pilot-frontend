import { useEffect } from "react";

export function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void,
  ignoredRefs: Array<React.RefObject<HTMLElement | null>> = []
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as Node;

      // Ignore click if it is inside the main ref
      if (ref.current?.contains(target)) {
        return;
      }

      // Ignore click if it is inside any ignored refs
      for (const ignoredRef of ignoredRefs) {
        if (ignoredRef.current?.contains(target)) {
          return;
        }
      }

      handler();
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler, ignoredRefs]);
}
