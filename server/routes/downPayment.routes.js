const express = require('express');
const router = express.Router();
const { initiateDownPayment, verifyPayment } = require('../controllers/downPayment.controller');


// Initiate down payment - protected route
router.post('/initiate', initiateDownPayment);

// Verify payment - protected route
router.put('/verify/:id', verifyPayment);

module.exports = router; 