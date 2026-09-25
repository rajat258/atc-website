import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { processChain } from "../data/capabilities";
import styles from "./Process.module.css";
import { media } from "../lib/media";

/**
 * The integrated plant, compressed to four steps.
 *
 * The full eight-step chain lives on the Capabilities page. This is the
 * argument, not the detail: we own the fabric, so the bag can be anything.
 */
export function Process() {
  const steps = processChain.filter((step) =>
    ["01", "02", "06", "08"].includes(step.index),
  );

  return (
    <section className={`section ${styles.process}`}>
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="How it is made"
          title="We start at the polymer, not the pattern"
          lede="Extrusion, weaving, printing, cutting and stitching all happen in house. Owning the fabric is the reason a custom base size does not turn into a six week conversation."
          action={<Button to="/capabilities" tone="outline">Full process</Button>}
        />

        <ol className={styles.steps}>
          {steps.map((step, i) => (
            <Reveal as="li" key={step.index} delay={i * 90} className={styles.step}>
              <span className={styles.index}>{step.index}</span>
              <h3 className={styles.name}>{step.name}</h3>
              <p className={styles.detail}>{step.detail}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal variant="scale" className={styles.band}>
        <img
          src={media("production-line.jpg")}
          alt="Production line machinery inside the Akshay FIBC plant"
          loading="lazy"
          decoding="async"
        />
        <span className={styles.bandWash} aria-hidden="true" />
        <blockquote className={styles.quote}>
          <p>
            Fill it. Shut it. Forget it. A bag should be the part of the job
            you never have to think about again.
          </p>
          <cite>Akshay FIBC</cite>
        </blockquote>
      </Reveal>
    </section>
  );
}
