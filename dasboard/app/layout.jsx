'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import './dashboard/dashboard.css';
import { BootstrapClient } from './dashboard/bootstrap-client';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BootstrapClient />
        {children}
      </body>
    </html>
  );
}