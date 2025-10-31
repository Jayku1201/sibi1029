import styles from './Metrics.module.css';

type Metric = {
  label: string;
  value: string;
};

interface MetricsProps {
  title: string;
  subtitle: string;
  metrics: Metric[];
}

export default function Metrics({ title, subtitle, metrics }: MetricsProps) {
  return (
    <section className={`section-container ${styles.metrics}`} id="metrics">
      <div className={styles.header}>
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
      </div>
      <div className={styles.grid}>
        {metrics.map((metric) => (
          <article key={metric.label} className={styles.card}>
            <div className={styles.value}>{metric.value}</div>
            <div className={styles.label}>{metric.label}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
