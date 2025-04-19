'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import styles from "./AuthSidebar.module.css";
import { useRouter } from 'next/navigation';
import { useAuth } from '../Context/AuthContext'; // Fixed import path
const checkPasswordStrength = (password) => {
  if (!password) return '';
  
  const criteria = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  const metCriteria = Object.values(criteria).filter(Boolean).length;

  if (metCriteria <= 2) return 'weak';
  if (metCriteria <= 4) return 'medium';
  return 'strong';
};

const PasswordStrengthIndicator = ({ strength }) => {
  if (!strength) return null;

  return (
    <div className={styles.strengthIndicator}>
      <div className={styles.strengthText}>
        Password Strength:
        <span className={`${styles.strengthLabel} ${styles[strength]}`}>
          {strength.charAt(0).toUpperCase() + strength.slice(1)}
        </span>
      </div>
      <div className={styles.strengthBars}>
        <div className={`${styles.bar} ${styles[`${strength}1`]}`} />
        <div className={`${styles.bar} ${styles[`${strength}2`]}`} />
        <div className={`${styles.bar} ${styles[`${strength}3`]}`} />
      </div>
    </div>
  );
};

const AuthSidebar = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { login, fetchUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    identifier: "",
  });
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetForm, setResetForm] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleFormReset = () => {
    setForm({
      username: "",
      email: "",
      password: "",
      identifier: "",
    });
    setAlert({ type: '', message: '' });
    setPasswordStrength('');
    setIsLogin(true);
  };

  // Add to window object for external access
  useEffect(() => {
    window.resetAuthForm = handleFormReset;
    return () => {
      delete window.resetAuthForm;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      handleFormReset();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    // Autofocus first input
    const input = document.querySelector(`.${styles.authSidebar} input`);
    if (input) input.focus();
  }, [isOpen, isLogin]);
 

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setResetForm(prev => ({
      ...prev,
      newPassword: newPassword
    }));
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    setAlert({ type: '', message: '' });
    
    // Check password strength when password field changes
    if (name === "password" && !isLogin) {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    try {
      if (!isLogin) {
        if (passwordStrength === 'weak') {
          throw new Error('Password is too weak. Please use a stronger password.');
        }
        
        // Registration
        await axios.post("http://localhost:3001/api/auth/register", {
          username: form.username,
          email: form.email,
          password: form.password
        });

        setAlert({
          type: 'success',
          message: 'Registration successful! Please log in.'
        });

        setTimeout(() => {
          setIsLogin(true);
          setForm({
            username: "",
            email: "",
            password: "",
            identifier: "",
          });
          setPasswordStrength('');
        }, 2000);
      } else {
        // Login
        const success = await login({
          identifier: form.identifier,
          password: form.password
        });

        if (success) {
          setAlert({
            type: 'success',
            message: 'Login successful! Redirecting...'
          });
          setTimeout(() => {
            onClose();
            router.push('/');
          }, 1500);
        }
      }
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.response?.data?.message || err.message || "Something went wrong"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    if (passwordStrength === 'weak') {
      setAlert({
        type: 'error',
        message: 'Password is too weak. Please use a stronger password.'
      });
      setLoading(false);
      return;
    }

    if (!resetForm.email) {
      setAlert({
        type: 'error',
        message: 'Email is required'
      });
      setLoading(false);
      return;
    }

    if (resetForm.newPassword !== resetForm.confirmPassword) {
      setAlert({
        type: 'error',
        message: 'Passwords do not match!'
      });
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/auth/reset-password', {
        email: resetForm.email,
        newPassword: resetForm.newPassword
      });

      setAlert({
        type: 'success',
        message: 'Password reset successful!'
      });

      setTimeout(() => {
        setIsResetPassword(false);
        setResetForm({ email: '', newPassword: '', confirmPassword: '' });
      }, 2000);

    } catch (err) {
      setAlert({
        type: 'error',
        message: err.response?.data?.message || 'Failed to reset password'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={`position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 ${styles.authBackdrop}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className={`${styles.authSidebar} bg-light p-4 shadow-lg h-100`}
            style={{ width: "350px", zIndex: 1050 }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={onClose}
              aria-label="Close"
            ></button>

            {isResetPassword ? (
              // Reset Password Form
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2>Reset Password</h2>
                {alert.message && (
                  <div className={`${styles.alert} ${styles[alert.type]}`}>
                    {alert.message}
                  </div>
                )}
                <form onSubmit={handleResetSubmit}>
                  <div>
                    <label htmlFor="resetEmail">Email</label>
                    <input
                      type="email"
                      id="resetEmail"
                      value={resetForm.email}
                      onChange={(e) => setResetForm(prev => ({
                        ...prev,
                        email: e.target.value
                      }))}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={resetForm.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      required
                    />
                    {resetForm.newPassword && (
                      <PasswordStrengthIndicator strength={passwordStrength} />
                    )}
                  </div>
                  <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={resetForm.confirmPassword}
                      onChange={(e) => setResetForm(prev => ({
                        ...prev,
                        confirmPassword: e.target.value
                      }))}
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading || passwordStrength === 'weak'}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                  <p className={styles.authToggleText}>
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      setIsResetPassword(false);
                      setResetForm({ email: '', newPassword: '', confirmPassword: '' });
                    }}>
                      Back to Login
                    </a>
                  </p>
                </form>
              </motion.div>
            ) : (
              <>
                <h2 className="text-center mb-4 fw-bold text-dark">
                  {isLogin ? "Sign In" : "Sign Up"}
                </h2>

                {alert.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${styles.alert} ${styles[alert.type]}`}
                    role="alert"
                  >
                    {alert.message}
                  </motion.div>
                )}

                {isLogin ? (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="identifierU">Usnearmnea mer  or Email</label>
                      <input
                        type="text"
                        id="identifier"
                        name="identifier"
                        value={form.identifier}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                      <div className={styles.forgotPassword}>
                        <a href="#" onClick={(e) => {
                          e.preventDefault();
                          setIsResetPassword(true);
                        }}>
                          Do you forget password?
                        </a>
                      </div>
                    </div>
                    <button type="submit" disabled={loading}>
                      {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                  </form>
                ) : (
                  <>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="username">Username</label>
                        <input
                          id="username"
                          type="text"
                          name="username"
                          placeholder="Enter your username"
                          value={form.username}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={form.email}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                          id="password"
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          value={form.password}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                        {!isLogin && form.password && (
                          <PasswordStrengthIndicator strength={passwordStrength} />
                        )}
                      </div>
                      <button 
                        type="submit" 
                        className="btn btn-primary w-100 fw-bold"
                        disabled={loading || (!isLogin && passwordStrength === 'weak')}
                      >
                        {loading ? (
                          <>
                            <span className={`${styles.loading} spinner-border spinner-border-sm`} role="status" aria-hidden="true"></span>
                            Please wait...
                          </>
                        ) : (
                          isLogin ? "Login" : "Register"
                        )}
                      </button>
                    </form>
                  </>
                )}

                <p
                  className={`${styles.authToggleText} text-center mt-3 text-dark fw-bold`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Sign In"}
                </p>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthSidebar;