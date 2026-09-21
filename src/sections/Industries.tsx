import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { industries } from "../data/industries";
import styles from "./Industries.module.css";

/**
 * Sectors served, as a spec table rather than a tile grid.
 *
 * Each row answers the question a buyer actually has: given what I ship,
 * which bag am I ordering? Competitors leave that to a phone call.
 */
export function Industries() {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="Who we pack for"
          title="Nine sectors, and the bag each one tends to need"
          lede="A starting point rather than a rule. Tell us the bulk density and how the material behaves, and we will tell you if the obvious answer is the right one."
        />

        <div className={styles.table} role="table" aria-label="Industries served">
          <div className={styles.head} role="row">
            <span role="columnheader">Sector</span>
            <span role="columnheader">Typically packed</span>
            <span role="columnheader">Usual bag</span>
          </div>

          {industries.map((industry, i) => (
            <Reveal
              key={industry.id}
              delay={Math.min(i, 6) * 55}
              className={styles.row}
              role="row"
            >
              <span className={styles.name} role="cell">
                {industry.name}
              </span>
              <span className={styles.commodities} role="cell">
                {industry.commodities}
              </span>
              <span className={styles.recommends} role="cell">
                {industry.recommends}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
