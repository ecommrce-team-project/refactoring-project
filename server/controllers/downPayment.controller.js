require("dotenv").config({ path: "./utils/.env" });
const { DownPayment, Estate, User, Op } = require('../database/index.js'); // Added Op
const axios = require('axios');

// Environment variables
const BASE_URL = process.env.BASE_URL; // Add this
const FLOUCI_APP_TOKEN = process.env.FLOUCI_APP_TOKEN;
const FLOUCI_APP_SECRET = process.env.FLOUCI_SECRET; // Renamed for clarity

module.exports = {
  initiateDownPayment: async (req, res) => {
    try {
      const { userId, estateId } = req.body;

      // Validate input
      if (!userId || !estateId) {
        return res.status(400).json({ error: 'userId and estateId are required' });
      }

      // Get estate details
      const estate = await Estate.findByPk(estateId);
      if (!estate) return res.status(404).json({ error: 'Estate not found' });

      // Calculate down payment (convert to string if API requires it)
      const downPaymentAmount = estate.price * 0.1;

      // Prepare Flouci payload
      const payload = {
        app_token: FLOUCI_APP_TOKEN,
        app_secret: FLOUCI_APP_SECRET, // Use renamed variable
        amount: downPaymentAmount.toString(), // Convert to string if API requires
        accept_card: "true",
        session_timeout_secs: 2200,
        success_link: `${BASE_URL}/down-payment/success`, // Use BASE_URL variable
        fail_link: `${BASE_URL}/down-payment/fail`,
        developer_tracking_id: process.env.FLOUCI_DEVELOPER_TRACKING_ID // Add your tracking ID
      };

      // Make API request
      const response = await axios.post(
        'https://developers.flouci.com/api/generate_payment', // Use full URL
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            // Add any additional required headers
          }
        }
      );
      console.log('Flouci response:', response); // Log the response for debugging

      // Create down payment record
      const { payment_url, payment_id } = response.data.result;

      const downPayment = await DownPayment.create({
        user_id: userId,
        estate_id: estateId,
        amount: downPaymentAmount,
        status: 'pending',
        payment_url,
        transaction_id: payment_id // Save Flouci’s ID here
      });


      res.status(201).json({
        message: 'Down payment initiated',
        payment_url: response.data.result.payment_url,
        downPaymentId: downPayment.id
      });

    } catch (error) {
      console.error('Payment error:', error.response?.data || error.message);
      res.status(500).json({
        error: 'Payment failed',
        details: error.response?.data || error.message
      });
    }
  },
  verifyPayment: async (req, res) => {
    try {
      const { paymentId } = req.params;

      const verification = await axios.get(
        `https://developers.flouci.com/api/verify_payment/${paymentId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'apppublic': FLOUCI_APP_TOKEN,
            'appsecret': FLOUCI_APP_SECRET
          }
        }
      );

      // Update payment status
      const downPayment = await DownPayment.findOne({
        where: { payment_url: { [Op.like]: `%${paymentId}%` } }
      });

      if (downPayment) {
        await downPayment.update({
          status: verification.data.result.status,
          transaction_id: paymentId
        });
      }

      res.status(200).json(verification.data);

    } catch (error) {
      console.error('Verification error:', error.response?.data || error.message);
      res.status(500).json({
        error: 'Verification failed',
        details: error.response?.data || error.message
      });
    }
  }
}