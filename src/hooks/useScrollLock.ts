import { useEffect } from "react";

/**
 * Freezes page scrolling while an overlay is open.
 *
 * Sets an attribute rather than an inline style so the rule lives in CSS
 * alongside everything else, and so two overlays can never leave the body in
 * a half-locked state.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    document.body.dataset.scrollLocked = "true";
    return () => {
      delete document.body.dataset.scrollLocked;
    };
  }, [locked]);
}
