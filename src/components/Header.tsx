import * as React from "react";
import { Link } from "gatsby";
import * as styles from "./Header.module.css";

const nav = [
  { to: "/about/", label: "About" },
  { to: "/projects/", label: "Projects" },
  { to: "/engagement/", label: "Engagement" },
  { to: "/contact/", label: "Contact" },
];

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.inner}>
      <Link to="/" className={styles.brand} aria-label="Sannvev Institute — home">
        <span className={styles.mark} aria-hidden="true">◆</span>
        <span className={styles.wordmark}>Sannvev Institute</span>
      </Link>
      <nav aria-label="Primary">
        <ul className={styles.navList}>
          {nav.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                partiallyActive
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
