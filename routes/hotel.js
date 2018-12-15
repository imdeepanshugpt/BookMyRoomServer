const hotelController = require('../controllers/hotel');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
router.use(bodyParser.json());

router.post('/', hotelController.getHotels);
router.post('/addComment', urlencodedParser, hotelController.addComments);
router.post('/addRating', urlencodedParser, hotelController.addRatings);
router.get('/getReviews', hotelController.getReviews);
router.post('/addReply', urlencodedParser, hotelController.addReply);

module.exports = router;