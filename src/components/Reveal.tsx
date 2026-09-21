import type { ElementType, ReactNode } from "react";
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
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
