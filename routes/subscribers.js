const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const subscriber = require('../controllers/subscriber');
router.use(bodyParser.json()); 

router.post('/addSubscriber', subscriber.addSubscriber);
router.post('/unSubscribe',subscriber.unSubscribe);
router.post('/subscribed', subscriber.subscribed);
router.post('/notifySubscriber', subscriber.pushNotification);

module.exports = router;