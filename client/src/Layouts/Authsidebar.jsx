import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const AuthSidebar = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    identifier: "",
  });

  useEffect(() => {
    // Reset form on mode switch
    setForm({
      username: "",
      email: "",
      password: "",
      identifier: "",
    });
  }, [isLogin]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    // Autofocus first input
    const input = document.querySelector(".auth-sidebar input");
    if (input) input.focus();
  }, [isOpen, isLogin]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isLogin
      ? "http://localhost:3000/api/auth/login"
      : "http://localhost:3000/api/auth/register";

    const data = isLogin
      ? { identifier: form.identifier, password: form.password }
      : { username: form.username, email: form.email, password: form.password };

    try {
      await axios.post(url, data, { withCredentials: true });

      if (!isLogin) {
        await axios.post("http://localhost:3000/api/auth/login", {
          identifier: form.username,
          password: form.password,
        }, {
          withCredentials: true,
        });
      }

      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
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
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="auth-sidebar position-fixed top-0 end-0 bg-light p-4 shadow-lg h-100"
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

            <h2 className="text-center mb-4 fw-bold text-dark">
              {isLogin ? "Sign In" : "Sign Up"}
            </h2>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="mb-3">
                    <label htmlFor="username" className="d-none">Username</label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={form.username}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="d-none">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </>
              )}
              {isLogin && (
                <div className="mb-3">
                  <label htmlFor="identifier" className="d-none">Username or Email</label>
                  <input
                    id="identifier"
                    type="text"
                    name="identifier"
                    placeholder="Username or Email"
                    value={form.identifier}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="password" className="d-none">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-warning w-100 fw-bold" disabled={loading}>
                {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
              </button>
            </form>

            <p
              className="auth-toggle-text text-center mt-3 text-dark fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthSidebar;
