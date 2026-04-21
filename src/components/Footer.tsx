import * as React from "react";
import { Link } from "gatsby";
import * as styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.block}>
          <p className={styles.brand}>Sannvev Institute</p>
          <p className={styles.muted}>
            Canadian federal not-for-profit corporation.
            <br />
            Winnipeg, Manitoba.
          </p>
        </div>
        <nav aria-label="Footer" className={styles.block}>
          <ul className={styles.list}>
            <li><Link to="/about/">About</Link></li>
            <li><Link to="/research/">Research</Link></li>
            <li><Link to="/engagement/">Engagement</Link></li>
            <li><Link to="/contact/">Contact</Link></li>
          </ul>
        </nav>
        <div className={styles.block}>
          <p className={styles.muted}>
            Member, Manitoba Innovates.
          </p>
        </div>
      </div>
      <div className={styles.copyline}>
        <small>&copy; {year} Sannvev Institute.</small>
      </div>
    </footer>
  );
};

export default Footer;
