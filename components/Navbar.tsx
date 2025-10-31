import Link from 'next/link';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          希比策略顧問 <span>SiBi Strategic Advisory</span>
        </div>
        <nav className={styles.links}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} scroll>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
