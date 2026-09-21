import { useState } from "react";
import { Button } from "../components/Button";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { Seo } from "../components/Seo";
import type { Division } from "../data/products";
import { divisions, products } from "../data/products";
import { contact } from "../data/site";
import styles from "./Products.module.css";

type Filter = "all" | Division;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fibc", label: divisions.fibc.name },
  { id: "trading", label: divisions.trading.name },
];

/** Order the divisions appear in, and the anchors the footer links to. */
const sections: { division: Division; anchor: string }[] = [
  { division: "fibc", anchor: "akshay-fibc" },
  { division: "trading", anchor: "akshay-trading" },
];

/** A handful of products carry their own anchor for footer deep links. */
const productAnchors: Record<string, string> = {
  "small-pp": "woven",
  "paper-sacks": "paper",
};

/** Cards stagger in, but the stagger stops growing after six steps. */
const STAGGER_STEP = 70;
const STAGGER_CAP = 5;

export function Products() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = products.filter(
    (product) => filter === "all" || product.division === filter,
  );

  return (
    <>
      <Seo
        title="Products"
        description="FIBC bulk bags, woven and BOPP sacks, paper sacks and reconditioned jumbo bags from ATC Group in Ahmedabad. Specifications, safe working loads and typical contents for every bag we make."
      />

      <header className={`section--invert ${styles.head}`}>
        <div className={`shell ${styles.headInner}`}>
          <p className="eyebrow">The range</p>
          <h1 className={styles.title}>Every bag we make, and what it is for.</h1>
          <p className={`lede ${styles.headLede}`}>
            Two divisions, one yard. Akshay FIBC builds new bulk bags and woven
            sacks on its own fabric. Akshay Trading Co. grades and supplies
            reconditioned jumbo bags and paper sacks. Open any card for the
            construction, the load rating and the contents it suits.
          </p>
        </div>
      </header>

      <div className={styles.filterBar}>
        <div className={`shell ${styles.filterInner}`}>
          <div className={styles.filters} role="group" aria-label="Filter by division">
            {filters.map((option) => (
              <button
                key={option.id}
                type="button"
                className={styles.filter}
                aria-pressed={filter === option.id}
                onClick={() => setFilter(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <p className={styles.count} aria-live="polite">
            {visible.length} {visible.length === 1 ? "product" : "products"}
          </p>
        </div>
      </div>

      {sections.map(({ division, anchor }) => {
        const shown = visible.filter((product) => product.division === division);
        if (shown.length === 0) return null;

        const meta = divisions[division];

        return (
          <section
            key={division}
            id={anchor}
            data-division={division}
            className={`section ${styles.division}`}
          >
            <div className="shell">
              <SectionHeading
                index={String(meta.since)}
                eyebrow={meta.tagline}
                title={meta.name}
                lede={meta.blurb}
              />

              <div className={styles.grid}>
                {shown.map((product, index) => (
                  <Reveal
                    key={product.id}
                    className={styles.cell}
                    delay={Math.min(index, STAGGER_CAP) * STAGGER_STEP}
                  >
                    <ProductCard
                      product={product}
                      anchorId={productAnchors[product.id]}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className={`section--invert ${styles.cta}`}>
        <div className={`shell ${styles.ctaInner}`}>
          <Reveal variant="rule" className="rule" />

          <div className={styles.ctaRow}>
            <Reveal className={styles.ctaText}>
              <p className="eyebrow">Enquiries</p>
              <h2 className={styles.ctaTitle}>Send us a spec, not a shortlist.</h2>
              <p className="lede">
                Tell us the material, the fill weight, the lift and how the bag
                gets emptied. We will come back with a construction, a safety
                factor and a price. Drawings and samples are welcome.
              </p>
            </Reveal>

            <Reveal className={styles.ctaActions} delay={140}>
              <Button to="/contact">Start an enquiry</Button>
              <Button href={contact.phoneHref} tone="outline">
                {contact.phone}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
