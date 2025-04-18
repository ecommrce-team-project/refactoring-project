'use client';

import styles from './paymentSuccess.module.css';

export default function PaymentSuccess() {
  return (
    <div className={styles.successPage}>
      <h1>Payment Successful</h1>
      <p>Thank you for your payment! Your transaction was completed successfully.</p>
      <a href="/" className={styles.homeLink}>Go Back to Home</a>
    </div>
  );
}