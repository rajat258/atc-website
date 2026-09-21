import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type RevealVariant = "up" | "mask" | "scale" | "left" | "rule";

type RevealProps = {
  children?: ReactNode;
  /** Which CSS reveal to apply. See the [data-reveal] rules in base.css. */
  variant?: RevealVariant;
  /** Stagger, in milliseconds. Use small multiples for list children. */
  delay?: number;
  /** Render as something other than a div, e.g. "li", "section", "h2". */
  as?: ElementType;
  className?: string;
};

/**
 * Wraps content so it animates in the first time it reaches the viewport.
 *
 * Deliberately thin: it owns no styling of its own, only the hook and the
 * data attributes the stylesheet keys off.
 *
 * The one exception is the "mask" wipe, which needs an inner element to
 * slide behind the observed element's own overflow. Clipping the observed
 * element itself is what an earlier version did, and it deadlocked: a
 * clip-path on the target zeroes its intersection rectangle, so the observer
 * that was meant to reveal it never fired and the heading stayed invisible
 * for good.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  as: Tag = "div",
  className,
  ...rest
}: RevealProps & Record<string, unknown>) {
  const ref = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={variant}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      {...rest}
    >
      {variant === "mask" ? <span className="reveal-wipe">{children}</span> : children}
    </Tag>
  );
}
