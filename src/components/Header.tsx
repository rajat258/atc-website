import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { contact, navigation } from "../data/site";
import { useScrollLock } from "../hooks/useScrollLock";
import { useScrolled } from "../hooks/useScrolled";
import { Logo } from "./Logo";
import styles from "./Header.module.css";

/**
 * Sticky site header.
 *
 * Transparent over the hero, then settles onto a blurred cream bar once the
 * page moves. On small screens the nav becomes a full-height drawer that
 * traps scroll and closes on route change or Escape.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(24);
  const { pathname } = useLocation();

  useScrollLock(open);

  // Any navigation dismisses the drawer, including back/forward.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header} data-scrolled={scrolled} data-open={open}>
      <div className={`shell ${styles.bar}`}>
        <Link to="/" className={styles.brand} aria-label="ATC Group, home">
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [styles.link, isActive ? styles.linkActive : ""].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href={contact.phoneHref} className={styles.phone}>
            {contact.phone}
          </a>
          <Link to="/contact" className={styles.cta}>
            Request a quote
          </Link>
        </div>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          <span className={styles.toggleBar} aria-hidden="true" />
          <span className={styles.toggleBar} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.drawer} id="mobile-nav" hidden={!open}>
        <nav className={styles.drawerNav} aria-label="Primary, mobile">
          {navigation.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={styles.drawerLink}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={styles.drawerIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.drawerFoot}>
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={contact.emailHref}>{contact.email}</a>
        </div>
      </div>
    </header>
  );
}
