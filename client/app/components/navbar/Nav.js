'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/Context/AuthContext.js';
import AuthSidebar from '@/app/Authside/AuthSidebar.js';
const Nav = () => {
  // const [token, setToken] = useState(localStorage.getItem('token'));
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '' });
  const isAdmin = user?.role === 'admin';
  useEffect(() => {
    // console.log('User:', user);
    
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      try {
        await logout();
        // Reset form states
        setIsOpen(false);
        setAlert({
          show: true,
          message: 'Logged out successfully!'
        });
        
        // Clear AuthSidebar form
        if (window.resetAuthForm) {
          window.resetAuthForm();
        }

        setTimeout(() => {
          setAlert({ show: false, message: '' });
          router.push('/');
          router.refresh();
        }, 2000);
      } catch (error) {
        setAlert({
          show: true,
          message: 'Error logging out'
        });
        setTimeout(() => setAlert({ show: false, message: '' }), 2000);
      }
    }
  };   
  
  return (
    <>
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
              {!user ? (
                    <button 
                      className={styles.signInButton}
                      onClick={() => setIsOpen(true)}
                    >
                      <img
                      src="/user.png"
                      alt="User"
                      style={{ 
                        width: '30px', 
                        height: '30px', 
                        objectFit: 'cover' 
                      }}
                      >

                      </img>
                    </button>
                  ) : (
                    <>
                      <button 
  className={styles.profile}
  onClick={() => router.push('/Profile')}
  style={{
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  }}
>
  <img 
    src={user.profilePicture} 
    alt="Profile"
    style={{ 
      width: '32px', 
      height: '32px', 
      borderRadius: '50%', 
      objectFit: 'cover',
      display: 'block'
    }}
  />
</button>
<p
  style={{
    marginRight: '10px',
    fontWeight: '500',
    fontSize: '16px',
    color: '#f5f5f5',
    fontFamily: 'sans-serif',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
    textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
    transition: 'color 0.3s ease',
    cursor: 'default',
  }}
  onMouseEnter={e => e.target.style.color = '#00bcd4'}
  onMouseLeave={e => e.target.style.color = '#f5f5f5'}
>
  {user.username}
</p>
                      <button 
                        className={styles.logoutButton}
                        onClick={handleLogout}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                        }}
                      >
                        <img 
    src="/logout.png" 
    alt="Logout"
    style={{
      width: '35px',
     
    }}
    className={styles.logoutIcon}
  />
                        
                      </button>
            {isAdmin && (
                        <Link href="/adminDashboard" className={styles.adminButton}>
                          Dashboard
                        </Link>
                      )}
                       </>
                  )}
                  <AuthSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
              </div>
            </li>
          </ul> 
        </div>
      </div>
    </nav>
    {alert.show && (
      <div className={styles.alertContainer}>
        <div className={`${styles.alert} ${styles.success}`}>
          {alert.message}
        </div>
      </div>
  )}
</>
  );
};

export default Nav;