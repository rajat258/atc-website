import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { Seo } from "../components/Seo";
import { divisions } from "../data/products";
import { contact, stats, FOUNDED_FIBC, FOUNDED_GROUP, yearsTrading } from "../data/site";
import { timeline } from "../data/timeline";
import { useCountUp } from "../hooks/useCountUp";
import styles from "./About.module.css";
import { media } from "../lib/media";

/** The two halves of the group, each pointing at its own shelf on /products. */
const divisionCards = [
  {
    ...divisions.fibc,
    href: "/products#akshay-fibc",
    image: "stitching-machine.jpg",
    alt: "A stitching machine on the bulk bag assembly floor.",
  },
  {
    ...divisions.trading,
    href: "/products#akshay-trading",
    image: "bag-forklift-lift.jpg",
    alt: "A jumbo bag lifted by forklift, with baled stock stacked in the yard.",
  },
];

/** Photographs of the units, shown above the location notes. */
const units = [
  {
    label: "Unit 1",
    image: "unit-1-dispatch.jpg",
    alt: "Unit 1, with a loaded truck at the dispatch bay.",
  },
  {
    label: "Unit 2",
    image: "unit-2-frontage.jpg",
    alt: "The frontage of Unit 2, with the ATC Group mark on the wall.",
  },
];

type StatProps = {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  note: string;
  delay: number;
};

/**
 * One headline figure.
 *
 * Split out because useCountUp is a hook and cannot run inside a map. The
 * hook holds the final value for readers who prefer reduced motion.
 */
function Stat({ value, decimals, suffix, label, note, delay }: StatProps) {
  const { ref, value: shown } = useCountUp(value);

  return (
    <Reveal as="li" className={styles.stat} delay={delay}>
      <p className={styles.statFigure}>
        <span ref={ref}>{shown.toFixed(decimals)}</span>
        {suffix ? <span className={styles.statSuffix}>{suffix}</span> : null}
      </p>
      <h3 className={styles.statLabel}>{label}</h3>
      <p className={styles.statNote}>{note}</p>
    </Reveal>
  );
}

/**
 * About.
 *
 * The group's own account of itself: two companies, a history, the figures
 * that go with it, and a plain statement of how the business is run.
 */
export function About() {
  return (
    <>
      <Seo
        title="About"
        description={`Two companies, one group. Akshay Trading Co. has been in packaging since ${FOUNDED_GROUP} and Akshay FIBC has been manufacturing since ${FOUNDED_FIBC}, from three units on the outskirts of Ahmedabad.`}
      />

      <header className={styles.pageHead}>
        <div className="shell">
          <Reveal>
            <span className="eyebrow">About the group</span>
          </Reveal>

          <Reveal as="h1" variant="mask" delay={80} className={styles.pageTitle}>
            Two companies, one group.
          </Reveal>

          <Reveal delay={180}>
            <p className={`lede ${styles.pageLede}`}>
              Akshay Trading Co. has been in packaging since {FOUNDED_GROUP}.
              Akshay FIBC has been manufacturing since {FOUNDED_FIBC}. Between
              them the group covers both halves of the trade, new bags built to
              a drawing and reconditioned bags graded for a second life.
            </p>
          </Reveal>

          <Reveal variant="rule" delay={280} className={`rule ${styles.pageRule}`} />
        </div>
      </header>

      {/* ---- 01 The two divisions -------------------------------------- */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            id="divisions"
            index="01"
            eyebrow="The two divisions"
            title="One makes them. One gives them a second life."
            lede="The two companies share an office, a yard and a customer list. They do not share a job. Keeping them separate is what lets us quote honestly for either."
          />

          <div className={styles.divisions}>
            {divisionCards.map((division, i) => (
              <Reveal
                key={division.id}
                className={styles.division}
                delay={i * 120}
              >
                <div className={styles.divisionMedia}>
                  <img
                    src={media(division.image)}
                    alt={division.alt}
                    className={styles.divisionImage}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className={styles.divisionBody}>
                  <p className={styles.divisionSince}>Since {division.since}</p>
                  <h3 className={styles.divisionName}>{division.name}</h3>
                  <p className={styles.divisionTagline}>{division.tagline}</p>
                  <p className={styles.divisionBlurb}>{division.blurb}</p>
                  <Button to={division.href} tone="ghost">
                    {division.name} products
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 02 Timeline ----------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            id="history"
            index="02"
            eyebrow="History"
            title="Four turns in the road."
            lede="The group did not set out to manufacture. Each step here was taken because a customer asked for something the business could not yet do."
          />

          <div className={styles.timeline}>
            <Reveal
              variant="rule"
              className={styles.timelineRule}
              aria-hidden="true"
            />

            <ol className={styles.milestones}>
              {timeline.map((milestone, i) => (
                <Reveal
                  as="li"
                  key={milestone.year}
                  className={styles.milestone}
                  delay={i * 110}
                >
                  <span className={styles.year}>{milestone.year}</span>
                  <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                  <p className={styles.milestoneDetail}>{milestone.detail}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---- 03 Figures ------------------------------------------------ */}
      <section className="section section--invert">
        <div className="shell">
          <SectionHeading
            id="figures"
            index="03"
            eyebrow="By the numbers"
            title="Where the group stands."
          />

          <ul className={styles.stats}>
            {stats.map((stat, i) => (
              <Stat
                key={stat.label}
                value={stat.value}
                decimals={"decimals" in stat ? stat.decimals : 0}
                suffix={stat.suffix}
                label={stat.label}
                note={stat.note}
                delay={i * 90}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* ---- 04 What we actually do ------------------------------------ */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            id="approach"
            index="04"
            eyebrow="How we work"
            title="What we actually do."
            lede={`There is no clever answer to this. After ${yearsTrading()} years the work is mostly knowing the material, answering the phone and loading on the day we said we would.`}
          />

          <div className={styles.approach}>
            <Reveal className={`prose ${styles.approachProse}`}>
              <p>
                We supply a small number of industries and we have supplied
                them for a long time. That means we know how a given material
                behaves in a bag, where it bridges, where it sifts and what it
                does to a seam in a damp yard. Most of what a buyer needs from
                us is that knowledge applied to their load.
              </p>
              <p>
                The work is taken end to end. Design, manufacture and
                distribution all sit inside the group, so there is one company
                answering for the bag from the first drawing to the delivery
                note. Nobody is passed between suppliers to find out whose
                fault something is.
              </p>
            </Reveal>

            <Reveal delay={120} className={`prose ${styles.approachProse}`}>
              <p>
                We would rather hold an account for a decade than win an order
                once. Repeat business is how the group has grown, and it only
                works if the second order is as good as the first. That shapes
                what we are willing to promise at the quoting stage.
              </p>
              <p>
                Service is personal. You deal with people who know your order
                and can tell you where it is. Delivery dates are treated as
                commitments rather than estimates, and when something is going
                to move you hear it from us before you have to ask.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- 05 Where we are ------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            id="where"
            index="05"
            eyebrow="Where we are"
            title="Ahmedabad, and outward from there."
          />

          <ul className={styles.units}>
            {units.map((unit, i) => (
              <Reveal as="li" key={unit.label} delay={i * 110} className={styles.unit}>
                <figure>
                  <div className={styles.unitMedia}>
                    <img
                      src={media(unit.image)}
                      alt={unit.alt}
                      className={styles.unitImage}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption className={styles.unitLabel}>{unit.label}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>

          <div className={styles.place}>
            <Reveal className={styles.placeItem}>
              <h3 className={styles.placeTitle}>Three manufacturing units</h3>
              <p className={styles.placeDetail}>
                All on the outskirts of {contact.address.city},{" "}
                {contact.address.state}, close enough to each other that work
                can move between them. Our base is at {contact.address.line1}.
              </p>
            </Reveal>

            <Reveal delay={90} className={styles.placeItem}>
              <h3 className={styles.placeTitle}>More than ten states</h3>
              <p className={styles.placeDetail}>
                Bags go out across India by road, to buyers in agriculture,
                chemicals, minerals, food processing and construction.
              </p>
            </Reveal>

            <Reveal delay={180} className={styles.placeItem}>
              <h3 className={styles.placeTitle}>A growing export book</h3>
              <p className={styles.placeDetail}>
                Export is a rising share of what leaves the yard. Orders are
                packed for the container rather than for the yard, and the
                paperwork travels with the load.
              </p>
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
              Start with what you need to move.
            </Reveal>
            <Reveal delay={120} className={styles.ctaActions}>
              <Button to="/contact">Talk to {contact.person}</Button>
              <Button to="/capabilities" tone="outline">
                See how bags are built
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
