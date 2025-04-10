import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert'; // Import SweetAlert
import '../css/ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    adress: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFormData(prev => ({
      ...prev,
      phonenumber: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!formData.email) {
      setError('Email is required');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/contact/add', formData);
      if (response.status === 201) {
        console.log("Form submitted successfully"); // Debugging log
        swal("Success!", "Your message has been sent successfully!", "success")
          .then(() => {
            setSubmitted(true); // Update state after alert is closed
          });
  
        // Reset form fields immediately
        setFormData({
          name: '',
          email: '',
          phonenumber: '',
          adress: '',
          message: ''
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err); // Debugging log
      setError(err.response?.data?.message || 'Error submitting form');
    }
  };
  if (submitted) {
    return (
      <div className="contact-container">
        <h1>Thank you!</h1>
        <p>Sent successfully</p>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <h1>Contact us!</h1>

      {error && <div className="error-message">{error}</div>}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phonenumber">Phone number</label>
          <input 
            type="tel" 
            id="phonenumber" 
            name="phonenumber"  
            value={formData.phonenumber}
            onChange={handlePhoneChange}
            pattern="[0-9]*"
            inputMode="numeric"
          />
        </div>

        <div className="form-group">
          <label htmlFor="adress">Address</label>
          <input 
            type="text" 
            id="adress" 
            name="adress"  
            value={formData.adress}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea 
            id="message" 
            name="message" 
            rows="4"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">Send</button>
      </form>

      <div className="contact-info">
        <p><strong>E-mail:</strong> info@darna.fr</p>
        <p><strong>Tél:</strong> 01 23 45 67 89</p>
      </div>
    </div>
  );
};

export default ContactUs;
