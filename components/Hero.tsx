import styles from './Hero.module.css';

interface HeroProps {
  headline: string;
  subhead: string;
  description: string;
  ctaLabel: string;
}

export default function Hero({ headline, subhead, description, ctaLabel }: HeroProps) {
  return (
    <section className={`${styles.hero} section-container`} id="hero">
      <h1>{headline}</h1>
      <p className={styles.subhead}>{subhead}</p>
      <p className={styles.description}>{description}</p>
      <div className={styles.actions}>
        <a href="#contact">
          <button className="primary">{ctaLabel}</button>
        </a>
      </div>
    </section>
  );
}
