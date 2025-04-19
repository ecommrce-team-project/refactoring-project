require("dotenv").config({ path: "./utils/.env" });
const { DownPayment, Estate, User, Op } = require('../database/index.js');
const axios = require('axios');

// Environment variables
const BASE_URL = process.env.BASE_URL;
const FLOUCI_APP_TOKEN = process.env.FLOUCI_APP_TOKEN;
const FLOUCI_APP_SECRET = process.env.FLOUCI_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;

module.exports = {
  initiateDownPayment: async (req, res) => {
    try {
      console.log('Received payment initiation request:', req.body);
      
      const { userId, estateId } = req.body;

      // Validate input
      if (!userId || !estateId) {
        console.log('Missing required fields:', { userId, estateId });
        return res.status(400).json({ 
          error: 'userId and estateId are required',
          received: { userId, estateId }
        });
      }

      // Get estate details
      const estate = await Estate.findByPk(estateId);
      if (!estate) {
        console.log('Estate not found:', estateId);
        return res.status(404).json({ error: 'Estate not found' });
      }

      console.log('Found estate:', estate.toJSON());

      // Calculate down payment
      const downPaymentAmount = estate.price * 0.1;
      console.log('Calculated down payment amount:', downPaymentAmount);

      // Prepare Flouci payload
      const payload = {
        app_token: FLOUCI_APP_TOKEN,
        app_secret: FLOUCI_APP_SECRET,
        amount: downPaymentAmount.toString(),
        accept_card: "true",
        session_timeout_secs: 2200,
        success_link: 'http://localhost:3000/estate/paymentSuccess', // Use BASE_URL variable
        fail_link: 'http://localhost:3000/estate/paymentFailure', // Use BASE_URL variable
        developer_tracking_id: process.env.FLOUCI_DEVELOPER_TRACKING_ID // Add your tracking ID
      };

      console.log('Flouci payload:', payload);

      // Make API request
      const response = await axios.post(
        `${BASE_URL}/generate_payment`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Flouci API response:', response.data);

      if (!response.data || !response.data.result) {
        throw new Error('Invalid response from payment gateway');
      }

      const { link, payment_id } = response.data.result;

      // Create down payment record
      const downPayment = await DownPayment.create({
        user_id: userId,
        estate_id: estateId,
        amount: downPaymentAmount,
        payment_url: link,
        transaction_id: payment_id,
        status: 'pending'
      });

      console.log('Created down payment record:', downPayment.toJSON());

      res.status(201).json({
        message: 'Down payment initiated',
        payment_url: link,
        downPaymentId: downPayment.id
      });

    } catch (error) {
      console.error('Payment error:', error.response?.data || error.message);
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        return res.status(401).json({
          error: 'Invalid payment gateway credentials',
          details: 'Please check your Flouci API credentials'
        });
      }
      
      if (error.response?.status === 400) {
        return res.status(400).json({
          error: 'Invalid payment request',
          details: error.response.data?.message || 'Please check your payment details',
          flouciError: error.response.data
        });
      }

      res.status(500).json({
        error: 'Payment failed',
        details: error.response?.data?.message || error.message
      });
    }
  },
  verifyPayment: async (req, res) => {
    try {
      const downPaymentId = req.params.id;
      const { payment_id } = req.body;

      console.log('Verification request:', { downPaymentId, payment_id });

      // Find the DownPayment record by its ID
      const downPayment = await DownPayment.findByPk(downPaymentId);
      if (!downPayment) {
        console.error('Down payment not found:', downPaymentId);
        return res.status(404).json({ error: 'Down payment not found' });
      }

      // Verify payment using Flouci API
      const verification = await axios.get(
        `${BASE_URL}/verify_payment/${payment_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'apppublic': FLOUCI_APP_TOKEN,
            'appsecret': FLOUCI_APP_SECRET
          }
        }
      );

      console.log('Flouci verification response:', verification.data);

      if (!verification.data || !verification.data.result) {
        throw new Error('Invalid verification response');
      }

      const status = verification.data.success ? 'paid' : 'failed';

      // Update the down payment status
      await downPayment.update({
        status: status,
        transaction_id: payment_id // Update the transaction ID
      });

      res.status(200).json({
        message: 'Payment verification completed',
        status: status,
        flouciResponse: verification.data
      });

    } catch (error) {
      console.error('Verification error:', error.response?.data || error.message);
      res.status(500).json({
        error: 'Verification failed',
        details: error.response?.data?.message || error.message
      });
    }
  }
};