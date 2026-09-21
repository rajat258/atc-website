import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { contact } from "../data/site";
import styles from "./CallToAction.module.css";

type CallToActionProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
};

/**
 * Closing band, shared by every page.
 *
 * Kept as a component rather than copied per page so the conversion path
 * stays identical wherever a visitor runs out of page.
 */
export function CallToAction({
  eyebrow = "Next step",
  title = "Send us the spec. We will send back a number.",
  body = "Load, material, dimensions and quantity are enough to start. If you only have half of that, send half of it.",
}: CallToActionProps) {
  return (
    <section className={`section--invert ${styles.cta}`}>
      <div className="shell">
        <Reveal variant="rule" className={`rule ${styles.rule}`} />

        <div className={styles.inner}>
          <div className={styles.text}>
            <p className="eyebrow">{eyebrow}</p>
            <Reveal as="h2" variant="mask" delay={80} className={styles.title}>
              {title}
            </Reveal>
            <Reveal delay={160}>
              <p className={styles.body}>{body}</p>
            </Reveal>
          </div>

          <Reveal delay={220} className={styles.actions}>
            <Button to="/contact">Request a quote</Button>
            <Button href={contact.phoneHref} tone="outline">
              {contact.phone}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
