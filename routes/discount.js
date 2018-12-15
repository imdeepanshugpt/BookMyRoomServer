const discountController = require('../controllers/discount');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', discountController.getdiscountDetails);
router.delete('/:_coupon',discountController.deleteCoupon);
module.exports = router;
