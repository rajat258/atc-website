import { useEffect, useRef } from "react";

/**
 * Reveals an element once it scrolls into view.
 *
 * The hook only flips a `data-revealed` attribute; every visual decision
 * lives in CSS (see base.css). That keeps animation off the main thread and
 * means a component can change its reveal style without touching JS.
 *
 * A single shared IntersectionObserver serves every element on the page, so
 * a long product list costs one observer rather than eighty.
 */

type RevealTarget = HTMLElement | null;

let observer: IntersectionObserver | null = null;

/** Everything currently waiting to be revealed, for the safety sweep below. */
const pending = new Set<HTMLElement>();
let sweepTimer: number | null = null;

const reveal = (node: HTMLElement) => {
  node.dataset.revealed = "true";
  pending.delete(node);
  observer?.unobserve(node);
};

/**
 * Last line of defence.
 *
 * Content that is hidden until an observer says otherwise is one styling
 * mistake away from being invisible for good, and that mistake is easy to
 * make: a clip-path on an observed element zeroes its intersection rectangle
 * and the callback never fires. This sweep runs once, a beat after the page
 * settles, and reveals anything already within the viewport that the
 * observer did not account for. If the observer is doing its job it finds
 * nothing.
 */
const scheduleSweep = () => {
  if (sweepTimer !== null) return;

  sweepTimer = window.setTimeout(() => {
    sweepTimer = null;
    const height = window.innerHeight;

    for (const node of [...pending]) {
      const { top, bottom } = node.getBoundingClientRect();
      if (top < height && bottom > 0) reveal(node);
    }
  }, 1800);
};

const getObserver = (): IntersectionObserver | null => {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }

  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // An element sitting entirely above the viewport has already been
        // scrolled past and will never intersect again. That happens on a
        // deep link to an anchor, on browser scroll restoration, and on any
        // instant jump down the page. Reveal it rather than leaving it
        // invisible forever.
        const scrolledPast = entry.boundingClientRect.bottom <= 0;

        if (!entry.isIntersecting && !scrolledPast) continue;

        // Reveal is a one-way trip. Unobserving keeps the callback cheap as
        // the page grows and stops elements flickering on scroll-up.
        reveal(entry.target as HTMLElement);
      }
    },
    // Fire slightly before the element is fully on screen so the motion has
    // finished by the time the reader's eye arrives.
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
  );

  return observer;
};

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node: RevealTarget = ref.current;
    if (!node) return;

    const io = getObserver();

    // No IntersectionObserver (very old browsers, or a prerender): show the
    // content immediately rather than leaving it stuck at opacity 0.
    if (!io) {
      node.dataset.revealed = "true";
      return;
    }


    io.observe(node);
    pending.add(node);
    scheduleSweep();

    return () => {
      pending.delete(node);
      io.unobserve(node);
    };
  }, []);

  return ref;
}
