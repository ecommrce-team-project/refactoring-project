'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './PaymentSuccess.module.css';

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const paymentId = searchParams.get('payment_id');
        const downPaymentId = localStorage.getItem('currentDownPaymentId');

        console.log('Payment verification started:', { paymentId, downPaymentId });

        if (!paymentId || !downPaymentId) {
          console.error('Missing payment information:', { paymentId, downPaymentId });
          setError('Missing payment information. Please try again.');
          setVerificationStatus('failed');
          return;
        }

        const response = await fetch(`http://localhost:3001/api/down-payments/verify/${downPaymentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ payment_id: paymentId })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Verification failed:', errorData);
          throw new Error(errorData.error || 'Payment verification failed');
        }

        const data = await response.json();
        console.log('Verification response:', data);
        
        setVerificationStatus('success');
        // Clear the stored ID
        localStorage.removeItem('currentDownPaymentId');
      } catch (error) {
        console.error('Verification error:', error);
        setError(error.message);
        setVerificationStatus('failed');
      }
    };

    verifyPayment();
  }, [searchParams]);

  const handleReturnToEstates = () => {
    router.push('/estate');
  };

  if (verificationStatus === 'verifying') {
    return (
      <div className={styles.successPage} data-status="verifying">
        <h1>Verifying Payment...</h1>
        <p>Please wait while we verify your payment.</p>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  if (verificationStatus === 'failed' || error) {
    return (
      <div className={styles.successPage} data-status="failed">
        <h1>Payment Verification Failed</h1>
        <p>{error || 'There was an error verifying your payment.'}</p>
        <button 
          onClick={handleReturnToEstates}
          className={styles.homeButton}
        >
          Return to Estates
        </button>
      </div>
    );
  }

  return (
    <div className={styles.successPage} data-status="success">
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. Your down payment has been processed successfully.</p>
      <button 
        onClick={handleReturnToEstates}
        className={styles.homeButton}
      >
        Return to Estates
      </button>
    </div>
  );
}