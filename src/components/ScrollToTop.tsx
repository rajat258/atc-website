import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Restores the top of the page on route change.
 *
 * A router keeps the scroll position by default, which leaves a visitor
 * halfway down a page they have never seen. Links carrying a hash are left
 * alone so in-page anchors still work.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Let the target render before trying to reach it.
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
      });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
