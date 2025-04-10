const express = require('express');

const { register, login, logout, getCurrentUser } = require('../controllers/Auth.controller.js');
const { verifyToken } = require('../middlewares/Auth.middleware.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', verifyToken, logout);
router.get('/me', verifyToken, getCurrentUser);

module.exports = router;