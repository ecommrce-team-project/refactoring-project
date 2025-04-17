'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          DARNA
        </Link>
        <div className={styles.navMenu}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/estate" className={styles.navLink}>
                Estate
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>
                Contact
              </Link>
            </li>
            <li className={styles.navItem}>
              <div className={styles.buttonGroup}>
                <Link href="/signin" className={styles.signInButton}>
                  Sign In
                </Link>
                <Link href="/adminDashboard" className={styles.adminButton}>
                  Dashboard
                </Link>
              </div>
            </li>
          </ul> 
        </div>
      </div>
    </nav>
  );
};

export default Nav;