import { credentials } from "../data/site";
import styles from "./Ticker.module.css";

/**
 * Credential ticker.
 *
 * The list is rendered twice so the strip can translate exactly -50% and
 * restart with no visible seam. The duplicate is hidden from assistive
 * technology so the claims are announced once, not twice.
 */
export function Ticker() {
  const run = (
    <ul className={styles.run}>
      {credentials.map((item) => (
        <li className={styles.item} key={item}>
          <span className={styles.mark} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <section className={styles.ticker} aria-label="What we do">
      <div className={styles.track}>
        {run}
        <div aria-hidden="true">{run}</div>
      </div>
    </section>
  );
}
