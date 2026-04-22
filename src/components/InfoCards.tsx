import * as React from "react";
import * as styles from "./InfoCards.module.css";

export interface InfoCard {
  eyebrow: string;
  title: string;
  body: string;
}

interface InfoCardsProps {
  cards: InfoCard[];
}

const InfoCards: React.FC<InfoCardsProps> = ({ cards }) => (
  <ul className={styles.row}>
    {cards.map((c) => (
      <li key={c.title} className={styles.card}>
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <h3 className={styles.title}>{c.title}</h3>
        <p className={styles.body}>{c.body}</p>
      </li>
    ))}
  </ul>
);

export default InfoCards;
