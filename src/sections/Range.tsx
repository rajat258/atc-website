import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { products } from "../data/products";
import styles from "./Range.module.css";
import { media } from "../lib/media";

/** The six types worth showing before a visitor commits to the full page. */
const featured = [
  "circular-cross-corner",
  "u-panel",
  "baffle-q",
  "food-grade",
  "type-c",
  "used-jumbo",
];

/**
 * A scannable grid of bag types.
 *
 * Competitor sites bury the catalogue two clicks deep. Here the first thing
 * below the group introduction is the thing a buyer actually came for.
 */
export function Range() {
  const shown = featured
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <section className={`section ${styles.range}`}>
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="The range"
          title="Pick the construction, we will build the bag"
          lede="Every bag on this list is made on our own fabric. Sizes, loops, spouts and liners are yours to specify."
          action={<Button to="/products" tone="outline">All products</Button>}
        />

        <ul className={styles.grid}>
          {shown.map((product, i) => (
            <Reveal
              as="li"
              key={product.id}
              delay={Math.min(i, 4) * 80}
              className={styles.cell}
            >
              <Link to={`/products#${product.id}`} className={styles.card}>
                <div className={styles.media}>
                  <img
                    src={media(product.image)}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className={styles.body}>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.summary}>{product.summary}</p>

                  <dl className={styles.spec}>
                    <dt>{product.specs[0].label}</dt>
                    <dd>{product.specs[0].value}</dd>
                  </dl>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
