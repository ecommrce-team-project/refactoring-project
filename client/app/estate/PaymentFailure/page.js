'use client';

import styles from './paymentFailure.module.css';

export default function PaymentFailure() {
  return (
    <div className={styles.failurePage}>
      <h1>Payment Failed</h1>
      <p>Unfortunately, your payment could not be processed. Please try again.</p>
      <a href="/estate" className={styles.homeLink}>Go Back to Home</a>
    </div>
  );
}