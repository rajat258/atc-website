import { useId, useState } from "react";
import type { Product } from "../data/products";
import styles from "./ProductCard.module.css";
import { media } from "../lib/media";

type ProductCardProps = {
  product: Product;
  /**
   * Optional anchor placed on the card itself. The footer deep-links to a
   * couple of individual products, so those cards need an id of their own.
   */
  anchorId?: string;
};

/**
 * One product, told in two passes.
 *
 * Closed, the card is a photograph, a name and a line a buyer can scan.
 * Opened, it becomes a datasheet: the longer explanation, the specification
 * table and the commodities the bag is built for.
 *
 * The panel animates on grid-template-rows, so the card grows to whatever
 * height its content needs without anyone guessing a max-height.
 */
export function ProductCard({ product, anchorId }: ProductCardProps) {
  const [open, setOpen] = useState(false);
  const reactId = useId();
  const panelId = `spec-${reactId}`;

  return (
    <article className={styles.card} id={anchorId} data-open={open}>
      <div className={styles.media}>
        <img
          className={styles.image}
          src={media(product.image)}
          alt={`${product.name} at the ATC Group plant`}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.wash} aria-hidden="true" />
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.summary}>{product.summary}</p>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((previous) => !previous)}
        >
          <span className={styles.toggleLabel}>Specifications</span>
          <span className={styles.icon} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.panel} id={panelId} aria-hidden={!open}>
        <div className={styles.panelClip}>
          <div className={styles.panelBody}>
            <p className={styles.detail}>{product.detail}</p>

            <div className={styles.block}>
              <h4 className={styles.blockLabel}>Specification</h4>
              <table className={styles.specs}>
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.label}>
                      <th scope="row" className={styles.specKey}>
                        {spec.label}
                      </th>
                      <td className={styles.specValue}>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.block}>
              <h4 className={styles.blockLabel}>Typical contents</h4>
              <ul className={styles.chips}>
                {product.applications.map((application) => (
                  <li key={application} className={styles.chip}>
                    {application}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
