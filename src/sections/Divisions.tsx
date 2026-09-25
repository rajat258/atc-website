import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { divisions } from "../data/products";
import styles from "./Divisions.module.css";
import { media } from "../lib/media";

const panels = [
  {
    ...divisions.fibc,
    image: "stitching-machine.jpg",
    alt: "Heavy duty stitching machine on the Akshay FIBC assembly floor",
    to: "/products#akshay-fibc",
    lines: ["New bulk bags", "Woven and BOPP sacks", "Built to your drawing"],
  },
  {
    ...divisions.trading,
    image: "bag-forklift-lift.jpg",
    alt: "A jumbo bag lifted by forklift in the yard, with baled stock behind",
    to: "/products#akshay-trading",
    lines: ["Reconditioned jumbo bags", "Paper sacks", "Inspected and graded"],
  },
];

/**
 * The group's two halves, side by side.
 *
 * The split is the clearest thing about ATC and the thing no competitor
 * offers, so it gets the first band after the hero.
 */
export function Divisions() {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="The group"
          title={
            <>
              Two companies. <br />
              One way of working.
            </>
          }
          lede="Akshay FIBC makes the bag. Akshay Trading Co. gives a good bag a second life. Between them there is an answer whether you need virgin polymer and a clean room, or two thousand bags to move aggregate next week."
        />

        <div className={styles.grid}>
          {panels.map((panel, i) => (
            <Reveal key={panel.id} delay={i * 110} className={styles.cell}>
              <Link to={panel.to} className={styles.panel}>
                <div className={styles.media}>
                  <img
                    src={media(panel.image)}
                    alt={panel.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={styles.wash} aria-hidden="true" />
                </div>

                <div className={styles.body}>
                  <p className={styles.since}>Since {panel.since}</p>
                  <h3 className={styles.name}>{panel.name}</h3>
                  <p className={styles.tagline}>{panel.tagline}</p>
                  <p className={styles.blurb}>{panel.blurb}</p>

                  <ul className={styles.lines}>
                    {panel.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>

                  <span className={styles.more}>
                    See the range
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path
                        d="M2 8h11M9 4l4 4-4 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
