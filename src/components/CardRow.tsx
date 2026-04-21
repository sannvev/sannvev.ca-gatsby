import * as React from "react";
import { Link } from "gatsby";
import * as styles from "./CardRow.module.css";

export interface Card {
  to: string;
  title: string;
  body: string;
}

interface CardRowProps {
  cards: Card[];
}

const CardRow: React.FC<CardRowProps> = ({ cards }) => (
  <ul className={styles.row}>
    {cards.map((c) => (
      <li key={c.to} className={styles.card}>
        <Link to={c.to} className={styles.link}>
          <h3 className={styles.title}>{c.title}</h3>
          <p className={styles.body}>{c.body}</p>
          <span className={styles.arrow} aria-hidden="true">→</span>
        </Link>
      </li>
    ))}
  </ul>
);

export default CardRow;
