// index.js or App.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './Contexts/Authcontext.jsx'; // Import your AuthProvider
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
