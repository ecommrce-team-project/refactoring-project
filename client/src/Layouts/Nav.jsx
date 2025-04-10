import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../css/Navbar.css';
import AuthSidebar from './Authsidebar.jsx';
import { useAuth } from '../Contexts/Authcontext.jsx';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Determine if we're on a page that needs a dark navbar
  const isDarkPage = location.pathname === '/profile';

  return (
    <>
      <nav className={`navbar navbar-expand-lg fixed-top ${
        scrolled || isDarkPage ? 'bg-light shadow navbar-scrolled' : 'bg-transparent'
      }`}>
        <div className="container">
          <Link to="/" className={`navbar-brand fw-bold ${
            scrolled || isDarkPage ? 'text-dark' : 'text-white'
          }`}>DARNA</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${
                  scrolled || isDarkPage ? 'text-dark' : 'text-white'
                }`}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/estate" className={`nav-link ${
                  scrolled || isDarkPage ? 'text-dark' : 'text-white'
                }`}>Estate</Link>
              </li>
              <li className="nav-item">

                <Link to="/contact" className={`nav-link ${
                  scrolled || isDarkPage ? 'text-dark' : 'text-white'
                }`}>Contact</Link>
              </li>
              {user ? (
                <li className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle d-flex align-items-center ${
                      scrolled || isDarkPage ? 'text-dark' : 'text-white'
                    }`}
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture||user.pfp}
                        alt="Profile"
                        className="rounded-circle me-2"
                        style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center me-2"
                        style={{ width: '30px', height: '30px', fontSize: '16px' }}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {user.username}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        <i className="bi bi-person-circle me-2"></i>Profile
                      </Link>
                    </li>
                    {user.role === 'admin' && (
                      <li>
                        <Link to="/admin" className="dropdown-item">
                          <i className="bi bi-gear-fill me-2"></i>Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <button
                    onClick={() => setAuthOpen(true)}
                    className="btn btn-warning rounded-pill px-4"
                  >
                    Sign In
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <AuthSidebar isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Nav;
