import { GetServerSideProps } from 'next';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import Paths from '../components/Paths';
import Metrics from '../components/Metrics';
import ContactForm from '../components/ContactForm';
import { getSectionContent } from '../lib/content';

interface PageProps {
  hero: {
    headline: string;
    subhead: string;
    description: string;
    ctaLabel: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    cards: { title: string; body: string }[];
  };
  paths: {
    title: string;
    subtitle: string;
    paths: { title: string; description: string }[];
  };
  metrics: {
    title: string;
    subtitle: string;
    metrics: { value: string; label: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    labels: {
      name: string;
      email: string;
      message: string;
      submit: string;
      success: string;
    };
  };
}

export default function HomePage({ hero, about, paths, metrics, contact }: PageProps) {
  return (
    <div>
      <Navbar />
      <main>
        <Hero {...hero} />
        <AboutSection {...about} />
        <Paths {...paths} />
        <Metrics {...metrics} />
        <ContactForm {...contact} />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} SiBi Strategic Advisory. All rights reserved.</p>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const [hero, about, paths, metrics, contact] = await Promise.all([
    getSectionContent('hero'),
    getSectionContent('about'),
    getSectionContent('paths'),
    getSectionContent('metrics'),
    getSectionContent('contact')
  ]);

  return {
    props: {
      hero,
      about,
      paths,
      metrics,
      contact
    } as PageProps
  };
};
