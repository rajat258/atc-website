import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Counts from zero to `target` the first time the element enters view.
 *
 * Driven by requestAnimationFrame against a wall clock rather than a fixed
 * step count, so the animation lasts the same time on a 60Hz and a 120Hz
 * display. Readers who prefer reduced motion get the final value at once.
 */
export function useCountUp(target: number, duration = 1600) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      setValue(target);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      start ??= now;
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out cubic: fast off the mark, settling gently on the figure.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        // Already scrolled past, so it will never intersect: a deep link, a
        // reload partway down, or a fast flick. Show the finished figure
        // rather than leaving a stat reading zero, which looks broken.
        if (!entry.isIntersecting) {
          if (entry.boundingClientRect.bottom > 0) return;
          io.disconnect();
          setValue(target);
          return;
        }

        io.disconnect();
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(node);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return { ref, value };
}
