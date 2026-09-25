import { useEffect } from "react";
import { Button } from "../components/Button";
import { FOUNDED_FIBC } from "../data/site";
import styles from "./Hero.module.css";
import { media } from "../lib/media";

const heroFacts = [
  { key: "Safe working load", value: "500 – 2,000 kg" },
  { key: "Safety factor", value: "5:1 / 6:1" },
  { key: "Annual output", value: "2.5 million bags" },
  { key: "Units", value: "3, near Ahmedabad" },
];

/**
 * Opening statement.
 *
 * The headline is split into lines so each one can wipe up from behind a
 * mask in sequence. Animation runs in CSS off a load-time delay rather than
 * an observer, because the hero is on screen before any scroll happens.
 */
export function Hero() {
  // Tell the header a dark band sits beneath it, so it can switch to light
  // type while unscrolled. Declared here rather than keyed off the route, so
  // any page that grows a hero gets the right header for free.
  useEffect(() => {
    document.body.dataset.darkHero = "true";
    return () => {
      delete document.body.dataset.darkHero;
    };
  }, []);

  const lines = ["Bulk bags", "built to spec,", "since " + FOUNDED_FIBC + "."];

  return (
    <section className={styles.hero}>
      <div className={styles.media} aria-hidden="true">
        <img
          src={media("unit-2-frontage.jpg")}
          alt=""
          className={styles.image}
          fetchPriority="high"
          decoding="async"
        />
        <div className={styles.scrim} />
        <div className={styles.grain} />
      </div>

      <div className={`shell ${styles.inner}`}>
        <p className={styles.eyebrow}>
          <span>Akshay FIBC</span>
          <span className={styles.dot} aria-hidden="true" />
          <span>Akshay Trading Co.</span>
        </p>

        <h1 className={styles.title}>
          {lines.map((line, i) => (
            <span className={styles.lineWrap} key={line}>
              <span className={styles.line} style={{ "--i": i } as React.CSSProperties}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className={styles.lede}>
          U panel, circular cross corner, baffle, food grade and Type C bags,
          made on our own fabric in Ahmedabad. Tell us the load, the material
          and the lift, and we will build to it.
        </p>

        <div className={`on-dark ${styles.actions}`}>
          <Button to="/products">See the range</Button>
          <Button to="/contact" tone="outline">
            Request a quote
          </Button>
        </div>
      </div>

      <div className={styles.rail}>
        <div className={`shell ${styles.railInner}`}>
          {heroFacts.map((fact, i) => (
            <div
              className={styles.fact}
              key={fact.key}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={styles.factKey}>{fact.key}</span>
              <span className={styles.factValue}>{fact.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
