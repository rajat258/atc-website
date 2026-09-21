import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import styles from "./NotFound.module.css";

/**
 * 404.
 *
 * Short by design. Two routes out, both of them useful: the homepage and the
 * catalogue, which is where most mistyped links were heading anyway.
 */
export function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="That page has moved or never existed. Head back to the ATC Group homepage or browse the bag catalogue."
      />

      <section className={styles.page}>
        <div className={`shell shell--narrow ${styles.inner}`}>
          <Reveal as="h1" variant="mask" className={styles.code}>
            404
          </Reveal>

          <Reveal variant="rule" className={`rule ${styles.rule}`} delay={120} />

          <Reveal delay={200}>
            <p className={styles.eyebrow}>
              <span className="eyebrow">Page not found</span>
            </p>
            <p className={styles.body}>
              This page has either moved or never existed. Nothing is broken at
              your end. Pick up the thread from one of these.
            </p>
          </Reveal>

          <Reveal className={styles.actions} delay={280}>
            <Button to="/">Back to home</Button>
            <Button to="/products" tone="outline">
              Browse the bags
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
