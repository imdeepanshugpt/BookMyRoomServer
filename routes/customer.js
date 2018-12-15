const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// router.use(bodyParser.json());  

const customerController = require('../controllers/customer');
router.use(bodyParser.json());
router.post('/userdetails', customerController.userDetails);
router.put('/editdetails/:customerEmail', customerController.editDetails)
router.get('/', customerController.getCustomers);
router.post('/signup-customer', customerController.signupCustomer);
router.post('/get-customer', customerController.findCustomerByEmail);

module.exports = router;