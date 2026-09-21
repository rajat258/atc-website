import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `threshold`.
 *
 * Reads are throttled to one per animation frame, so the sticky header can
 * restyle on scroll without the listener becoming the bottleneck.
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const read = () => {
      setScrolled(window.scrollY > threshold);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
