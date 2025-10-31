import { FormEvent, useState } from 'react';
import axios from 'axios';
import styles from './ContactForm.module.css';

interface ContactFormProps {
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
}

export default function ContactForm({ title, subtitle, email, labels }: ContactFormProps) {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    try {
      await axios.post('/api/v1/contact', formState);
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className={`section-container ${styles.contact}`} id="contact">
      <div className={styles.header}>
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
        <p className={styles.email}>Email: <a href={`mailto:${email}`}>{email}</a></p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          {labels.name}
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
        </label>
        <label className={styles.label}>
          {labels.email}
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
            required
          />
        </label>
        <label className={styles.label}>
          {labels.message}
          <textarea
            name="message"
            rows={4}
            value={formState.message}
            onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
            required
          />
        </label>
        <button className="primary" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : labels.submit}
        </button>
        {status === 'success' && <div className={styles.success}>{labels.success}</div>}
        {status === 'error' && <div className={styles.error}>Something went wrong. Please try again.</div>}
      </form>
    </section>
  );
}
