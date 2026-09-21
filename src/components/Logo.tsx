import type { CSSProperties } from "react";
import maskUrl from "../assets/logo-mask.png";
import styles from "./Logo.module.css";

type LogoProps = {
  /** Show the "ATC GROUP" wordmark beside the monogram. */
  withWordmark?: boolean;
  className?: string;
};

/**
 * The AT monogram.
 *
 * Rendered as a CSS mask over `currentColor` rather than an <img>, so one
 * asset serves cream, forest and photographic backgrounds instead of three.
 * The mask URL is imported so Vite hashes it and rewrites it for whatever
 * base path the build targets.
 */
export function Logo({ withWordmark = true, className }: LogoProps) {
  return (
    <span className={[styles.logo, className].filter(Boolean).join(" ")}>
      <span
        className={styles.mark}
        style={{ "--mask": `url(${maskUrl})` } as CSSProperties}
        aria-hidden="true"
      />
      {withWordmark && (
        <span className={styles.wordmark} aria-hidden="true">
          <span className={styles.word}>ATC</span>
          <span className={styles.word}>Group</span>
        </span>
      )}
      <span className="visually-hidden">ATC Group</span>
    </span>
  );
}
