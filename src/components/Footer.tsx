import { Link } from "react-router-dom";
import { contact, navigation, site, FOUNDED_GROUP } from "../data/site";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import styles from "./Footer.module.css";

const productLinks = [
  { label: "New FIBC bulk bags", to: "/products#akshay-fibc" },
  { label: "Reconditioned jumbo bags", to: "/products#akshay-trading" },
  { label: "Woven and BOPP sacks", to: "/products#woven" },
  { label: "Paper sacks", to: "/products#paper" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="shell">
        <Reveal variant="rule" className={`rule ${styles.topRule}`} />

        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Logo />
            <p className={styles.blurb}>
              Two companies, one group. Akshay FIBC builds new bulk bags to
              your drawing. Akshay Trading Co. keeps reconditioned jumbo bags
              and paper sacks moving. Both run out of Ahmedabad.
            </p>
            <p className={styles.tagline}>{site.tagline}</p>
          </div>

          <nav className={styles.col} aria-label="Products">
            <h3 className={styles.colTitle}>Products</h3>
            <ul>
              {productLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.col} aria-label="Company">
            <h3 className={styles.colTitle}>Company</h3>
            <ul>
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
              <li>
                <a href={contact.linkedin} target="_blank" rel="noreferrer noopener">
                  LinkedIn
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Talk to us</h3>
            <ul>
              <li><a href={contact.phoneHref}>{contact.phone}</a></li>
              <li><a href={contact.emailHref}>{contact.email}</a></li>
              <li><a href={contact.whatsappHref} target="_blank" rel="noreferrer noopener">WhatsApp</a></li>
            </ul>
            <address className={styles.address}>
              {contact.address.line1}
              <br />
              {contact.address.city}, {contact.address.state}
              <br />
              {contact.address.country}
            </address>
          </div>
        </div>

        <div className={styles.base}>
          <p>
            &copy; {year} ATC Group. Akshay FIBC and Akshay Trading Co.
            Trading since {FOUNDED_GROUP}.
          </p>
          <p className={styles.built}>Ahmedabad, Gujarat, India</p>
        </div>
      </div>
    </footer>
  );
}
