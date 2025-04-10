import React, { useState } from 'react';
import axios from 'axios';

function Payment() {
  const [form, setForm] = useState({
    amount: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onchange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    axios
      .post("http://localhost:5000/api/payment", form)
      .then((res) => {
        const { result } = res.data;
        window.location.href = result.link;
      })
      .catch((err) => {
        console.log(err);
        setError('Payment processing failed. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="h4 mb-0">
                <i className="bi bi-credit-card me-2"></i>
                Payment Information
              </h2>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount ($)</label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="0.00"
                    className="form-control"
                    onChange={onchange}
                    value={form.amount}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="form-control"
                    onChange={onchange}
                    value={form.cardNumber}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="cardName" className="form-label">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    id="cardName"
                    placeholder="John Doe"
                    className="form-control"
                    onChange={onchange}
                    value={form.cardName}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      id="expiryDate"
                      placeholder="MM/YY"
                      className="form-control"
                      onChange={onchange}
                      value={form.expiryDate}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cvv" className="form-label">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      id="cvv"
                      placeholder="123"
                      className="form-control"
                      onChange={onchange}
                      value={form.cvv}
                      required
                    />
                  </div>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-lock-fill me-2"></i>
                        Pay ${form.amount || '0.00'}
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-3 text-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-LIu82jh7JpnLEeKp4W5eGbTYGbmNPfUa5w&s"
                    alt="Visa"
                    className="payment-icon me-2"
                    style={{ height: '30px' }}
                  />
                  <img
                    src="https://www.logo.wine/a/logo/Mastercard/Mastercard-Logo.wine.svg"
                    alt="Mastercard"
                    className="payment-icon me-2"
                    style={{ height: '30px' }}
                  />
                  <img
                    src="https://www.logo.wine/a/logo/American_Express/American_Express-Logo.wine.svg"
                    alt="American Express"
                    className="payment-icon"
                    style={{ height: '30px' }}
                  />
                </div>
              </form>
            </div>
            <div className="card-footer bg-light">
              <p className="small mb-0 text-muted">
                <i className="bi bi-shield-lock me-2"></i>
                Your payment information is securely encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;