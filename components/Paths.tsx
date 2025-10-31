import styles from './Paths.module.css';
import { marked } from 'marked';

const renderer = new marked.Renderer();

marked.setOptions({ breaks: true, gfm: true, renderer });

type PathItem = {
  title: string;
  description: string;
};

interface PathsProps {
  title: string;
  subtitle: string;
  paths: PathItem[];
}

export default function Paths({ title, subtitle, paths }: PathsProps) {
  return (
    <section className={`section-container ${styles.paths}`} id="services">
      <div className={styles.header}>
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
      </div>
      <div className="section-card-grid">
        {paths.map((path) => (
          <article key={path.title} className="section-card">
            <h3>{path.title}</h3>
            <div
              className={styles.sectionCardContent}
              dangerouslySetInnerHTML={{ __html: marked.parse(path.description) as string }}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
