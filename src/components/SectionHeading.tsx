import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  /** Two-digit section number, e.g. "01". Renders in the left margin. */
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Optional right-hand slot, usually a Button. */
  action?: ReactNode;
  align?: "start" | "center";
  id?: string;
};

/**
 * The standard band opener: a hairline rule that draws itself in, a numbered
 * spec-sheet label, the heading, and an optional lede.
 *
 * Reused by every section so vertical rhythm is identical across pages.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  action,
  align = "start",
  id,
}: SectionHeadingProps) {
  return (
    <header className={styles.head} data-align={align} id={id}>
      <Reveal variant="rule" className={`rule ${styles.rule}`} />

      <div className={styles.row}>
        <div className={styles.text}>
          {(index || eyebrow) && (
            <Reveal className={styles.meta} delay={60}>
              {index && <span className={styles.index}>{index}</span>}
              {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            </Reveal>
          )}

          <Reveal as="h2" variant="mask" delay={120} className={styles.title}>
            {title}
          </Reveal>

          {lede && (
            <Reveal delay={200} className={styles.lede}>
              <p className="lede">{lede}</p>
            </Reveal>
          )}
        </div>

        {action && (
          <Reveal delay={260} className={styles.action}>
            {action}
          </Reveal>
        )}
      </div>
    </header>
  );
}
