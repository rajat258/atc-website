import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { Seo } from "../components/Seo";
import { buildOptions, processChain } from "../data/capabilities";
import styles from "./Capabilities.module.css";
import { media } from "../lib/media";

/** The checks that run on every order, written as claims we can stand behind. */
const qualityPoints = [
  "Virgin polymer only on food grade work",
  "Segregated clean area for assembly and packing",
  "Sanitised and sealed before dispatch",
  "Seam and lifting loop inspection on every bag",
  "Batch and production date recorded for traceability",
];

/**
 * Capabilities.
 *
 * The page exists to answer one question a buyer cannot answer from a
 * competitor's site: what can actually be specified, and who makes it. The
 * process chain is the showpiece, so it gets the drawn spine and the stagger.
 */
export function Capabilities() {
  return (
    <>
      <Seo
        title="Capabilities"
        description="A fully integrated FIBC plant near Ahmedabad. Extrusion, weaving, coating, printing, cutting and stitching in house, with build options, hygiene practice and dispatch set out in full."
      />

      <header className={styles.pageHead}>
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Capabilities</span>
          </Reveal>

          <Reveal as="h1" variant="mask" delay={80} className={styles.pageTitle}>
            One roof, from polymer to pallet.
          </Reveal>

          <Reveal delay={180}>
            <p className={`lede ${styles.pageLede}`}>
              The plant is integrated end to end. Extrusion, weaving, coating,
              printing, cutting and stitching all happen on our own floor in
              Ahmedabad. That is what makes a genuinely custom size practical,
              and it is why the fabric in your bag is fabric we made.
            </p>
          </Reveal>

          <Reveal variant="rule" delay={280} className={`rule ${styles.pageRule}`} />
        </div>
      </header>

      {/* ---- 01 The process chain -------------------------------------- */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            id="process"
            index="01"
            eyebrow="The process chain"
            title="Eight steps, none of them sent out."
            lede="Polymer arrives at one end of the plant. A folded, inspected, sealed bag leaves at the other. Nothing in between goes to a third party, so nothing in between is out of our hands."
          />

          <div className={styles.chain}>
            <Reveal variant="rule" className={styles.spine} aria-hidden="true" />

            <ol className={styles.steps}>
              {processChain.map((step, i) => (
                <Reveal
                  as="li"
                  key={step.index}
                  className={styles.step}
                  delay={(i % 3) * 90}
                >
                  <span className={styles.stepIndex} aria-hidden="true">
                    {step.index}
                  </span>
                  <div className={styles.stepBody}>
                    <h3 className={styles.stepName}>{step.name}</h3>
                    <p className={styles.stepDetail}>{step.detail}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---- 02 Build options ------------------------------------------ */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            id="build-options"
            index="02"
            eyebrow="Build options"
            title="Configure the bag."
            lede="Four decisions describe a bulk bag. Pick one line from each group and you have a specification we can quote against. If what you need is not on the list, describe it and we will tell you straight whether we can build it."
          />

          <ul className={styles.optionGrid}>
            {buildOptions.map((group, i) => (
              <Reveal
                as="li"
                key={group.id}
                className={styles.optionCard}
                delay={(i % 4) * 80}
              >
                <h3 className={styles.optionTitle}>{group.title}</h3>
                <p className={styles.optionNote}>{group.note}</p>
                <ul className={styles.optionList}>
                  {group.options.map((option) => (
                    <li key={option} className={styles.option}>
                      {option}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Full bleed band ------------------------------------------- */}
      <section className={styles.band}>
        <img
          src={media("production-line.jpg")}
          alt="Production line machinery at the Akshay FIBC plant."
          className={styles.bandImage}
          loading="lazy"
          decoding="async"
        />
        <div className={styles.bandScrim} aria-hidden="true" />

        <div className={`shell ${styles.bandInner}`}>
          <Reveal variant="mask">
            <blockquote className={styles.quote}>
              <p>
                Because we weave the fabric ourselves, a bag that is not a
                standard size is still an ordinary week of work.
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ---- 03 Quality and hygiene ------------------------------------ */}
      <section className="section section--invert">
        <div className="shell">
          <SectionHeading
            id="quality"
            index="03"
            eyebrow="Quality and hygiene"
            title="Clean work is kept apart."
            lede="Food grade production is separated from general production at every stage, from the polymer going in to the wrap going on the bale."
          />

          <div className={styles.qualityGrid}>
            <Reveal className={`prose ${styles.qualityProse}`}>
              <p>
                Food grade bags run on virgin polymer. No recycled content goes
                into them, so nothing is in the fabric that was not chosen for
                the job.
              </p>
              <p>
                Assembly and packing for clean work happen in a segregated
                area, away from the general floor. Bags are sanitised and
                sealed before they are baled, so what reaches your filling line
                arrives free of dust, germs and pollutants rather than merely
                swept out.
              </p>
              <p>
                Every bag is checked by hand for seam integrity and loop
                attachment before it is folded. Batch and production date are
                recorded, so a bag can be traced back to the run it came from.
              </p>
            </Reveal>

            <Reveal delay={120} className={styles.qualityListWrap}>
              <h3 className={styles.qualityListTitle}>On every order</h3>
              <ul className={styles.qualityList}>
                {qualityPoints.map((point) => (
                  <li key={point} className={styles.qualityPoint}>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={200} className={styles.certNote}>
            <p className={styles.certText}>
              We do not publish certification claims on this site. The
              documents a buyer needs differ by market and they change, so a
              logo on a web page is worth less than current paperwork. Tell us
              which standard your customer asks for and we will send the
              documents that apply to your order.
            </p>
            <Button to="/contact" tone="outline">
              Request current documents
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ---- 04 Dispatch ----------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            id="dispatch"
            index="04"
            eyebrow="Dispatch"
            title="Loaded to your date."
            lede="Bags go out to more than ten states across India, and a growing share of the order book leaves as export."
          />

          <div className={styles.dispatch}>
            <Reveal className={`prose ${styles.dispatchProse}`}>
              <p>
                We keep stock of the sizes we run most often, and we schedule
                custom work against the delivery date you give us rather than
                the one that suits the floor. If a date is going to move, you
                hear it from us first.
              </p>
              <p>
                Orders are baled, counted and loaded to a plan. What leaves the
                gate matches the paperwork that travels with it, which is the
                part that decides whether a delivery is easy at the other end.
              </p>
              <p>
                Export orders are packed for the container rather than for the
                yard, so the load arrives in the shape it left in.
              </p>
            </Reveal>

            <Reveal variant="scale" delay={120} className={styles.dispatchMedia}>
              <img
                src={media("truck-loaded-night.jpg")}
                alt="A loaded truck being sheeted at the plant after dark."
                className={styles.dispatchImage}
                loading="lazy"
                decoding="async"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Closing call to action ------------------------------------ */}
      <section className={`section ${styles.cta}`}>
        <div className="shell">
          <Reveal variant="rule" className={`rule ${styles.ctaRule}`} />
          <div className={styles.ctaInner}>
            <Reveal as="h2" variant="mask" className={styles.ctaTitle}>
              Send us the load, the material and the lift.
            </Reveal>
            <Reveal delay={120} className={styles.ctaActions}>
              <Button to="/contact">Request a quote</Button>
              <Button to="/products" tone="outline">
                See the range
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
