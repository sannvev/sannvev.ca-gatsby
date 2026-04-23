import * as React from "react";
import { Link } from "gatsby";
import * as styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.institutional}>
          <p className={styles.brand}>Sannvev Institute</p>
          <p className={styles.meta}>
            A Canadian federal not-for-profit corporation (CNCA).
            <br />
            Incorporated April 22, 2026.
            <br />
            Registered office: 423 Main Street, 8th Floor,
            <br />
            Winnipeg, Manitoba R3B 1B3.
          </p>
        </div>
        <nav aria-label="Footer" className={styles.linksCol}>
          <ul className={styles.list}>
            <li><Link to="/about/">About</Link></li>
            <li><Link to="/projects/">Projects</Link></li>
            <li><Link to="/engagement/">Engagement</Link></li>
            <li><Link to="/contact/">Contact</Link></li>
          </ul>
          <ul className={styles.listPending} aria-label="Forthcoming documents">
            <li><span className={styles.pending}>Governance</span></li>
            <li><span className={styles.pending}>IP Policy</span></li>
            <li><span className={styles.pending}>Trademark Use</span></li>
          </ul>
          <p className={styles.pendingNote}>Linked when published.</p>
        </nav>
      </div>
      <div className={styles.bottomBar}>
        <small>
          &copy; {year} Sannvev Institute. Content licensed CC BY 4.0 except where noted.
          Code licensed under each project's respective open-source license.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
