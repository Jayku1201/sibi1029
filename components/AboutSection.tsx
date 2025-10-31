import styles from './AboutSection.module.css';

type AboutCard = {
  title: string;
  body: string;
};

interface AboutSectionProps {
  title: string;
  subtitle: string;
  description: string;
  cards: AboutCard[];
}

export default function AboutSection({ title, subtitle, description, cards }: AboutSectionProps) {
  return (
    <section className={`section-container ${styles.about}`} id="about">
      <div className={styles.header}>
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className="section-card-grid">
        {cards.map((card) => (
          <article key={card.title} className="section-card">
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
