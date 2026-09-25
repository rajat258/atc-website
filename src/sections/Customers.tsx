import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { customers } from "../data/customers";
import { media } from "../lib/media";
import styles from "./Customers.module.css";

/**
 * Named customers, shown by their own logos.
 *
 * Each logo sits on a white tile rather than the cream page, because the
 * marks were drawn for white and two of them carry a white ground of their
 * own that would otherwise show as a box.
 */
export function Customers() {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          index="05"
          eyebrow="Who we supply"
          title="Our valuable customers"
        />

        <ul className={styles.grid}>
          {customers.map((customer, i) => (
            <Reveal as="li" key={customer.id} delay={i * 90} className={styles.cell}>
              <a
                href={customer.url}
                className={styles.tile}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={media(customer.logo)}
                  alt={customer.name}
                  className={styles.logo}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
