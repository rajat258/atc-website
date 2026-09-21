import { Reveal } from "../components/Reveal";
import { Stat } from "../components/Stat";
import { stats } from "../data/site";
import styles from "./Numbers.module.css";

/**
 * The four figures, on an inverted band.
 *
 * Deliberately short. Everything here is a number the client can stand
 * behind, which is more than most sites in this market manage.
 */
export function Numbers() {
  return (
    <section className={`section section--invert ${styles.band}`}>
      <div className="shell">
        <Reveal variant="rule" className={`rule ${styles.rule}`} />

        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className={styles.cell}>
              <Stat
                value={stat.value}
                decimals={"decimals" in stat ? stat.decimals : 0}
                suffix={stat.suffix}
                label={stat.label}
                note={stat.note}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
