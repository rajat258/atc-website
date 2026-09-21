import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

type Tone = "solid" | "outline" | "ghost";

type BaseProps = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
};

type ButtonProps = BaseProps & {
  /** Internal route. */
  to?: string;
  /** External or protocol link (tel:, mailto:, https:). */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

/**
 * One call to action, three renderings.
 *
 * Picks the right element for the job — Link for routes, anchor for external
 * destinations, button for actions — so keyboard and screen-reader behaviour
 * is correct without the caller thinking about it.
 */
export function Button({
  children,
  tone = "solid",
  to,
  href,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  const cls = [styles.btn, styles[tone], className].filter(Boolean).join(" ");

  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M2 8h11M9 4l4 4-4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
