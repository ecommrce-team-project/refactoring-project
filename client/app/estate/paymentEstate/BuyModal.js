import React from 'react';
import styles from './BuyModal.module.css';

const BuyModal = ({ estate, onClose, onConfirm }) => {
  if (!estate) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Confirm Your Purchase</h2>
        <p className={styles.message}>
          Are you sure you want to put a down payment on <strong>{estate.title}</strong> for <strong>${estate.price*0.1}</strong>?
        </p>
        <div className={styles.buttons}>
          <button onClick={onConfirm} className={styles.confirm}>Yes, Pay</button>
          <button onClick={onClose} className={styles.cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
