const express = require('express');
const router = express.Router();
const { addcontact , getAllcontacts } = require('../controllers/Contactus.conrolles.js');


router.get('/getall',getAllcontacts)
router.post('/add',addcontact)


module.exports = router; 