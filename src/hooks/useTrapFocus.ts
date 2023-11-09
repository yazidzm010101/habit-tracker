import { useEffect } from "react";

export function useTrapFocus({
  ref,
  dependencies,
  condition,
  onEscape,
}: {
  ref: any;
  dependencies: any;
  condition?: boolean;
  onEscape: Function;
}) {
  useEffect(() => {
    if (condition) {
      const handleTabKeyPress = (event: any) => {
        if (event.key === "Tab") {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
          ) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };

      const handleEscapeKeyPress = (event: any) => {
        if (event.key === "Escape") {
          onEscape();
        }
      };
      const modalElement = ref.current;
      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      modalElement.addEventListener("keydown", handleTabKeyPress);
      modalElement.addEventListener("keydown", handleEscapeKeyPress);
      return () => {
        modalElement.removeEventListener("keydown", handleTabKeyPress);
        modalElement.removeEventListener("keydown", handleEscapeKeyPress);
      };
    }
  }, dependencies);
}
