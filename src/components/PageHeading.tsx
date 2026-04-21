import * as React from "react";
import * as styles from "./PageHeading.module.css";

interface PageHeadingProps {
  eyebrow?: string;
  title: string;
  lede?: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ eyebrow, title, lede }) => (
  <header className={styles.heading}>
    {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
    <h1>{title}</h1>
    {lede && <p className={styles.lede}>{lede}</p>}
  </header>
);

export default PageHeading;
