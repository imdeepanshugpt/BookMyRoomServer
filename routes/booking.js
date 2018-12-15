const bookingController = require('../controllers/booking');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.post('/bookingdetails', bookingController.postBookingdetails);
router.post('/bookinghistory', bookingController.bookingDetails);
router.post('/bookedUserDetail', bookingController.getbookingDetails);

module.exports = router
