const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const managerController = require('../controllers/manager');
router.post('/signup-manager',managerController.signupManager);
router.get('/',managerController.getManager);
router.put('/approved/:managerEmail',managerController.changeStatus);
router.delete('/reject/:managerEmail',managerController.declineRequest);
router.post('/getManagerHotels', managerController.getManagerHotels);
router.post('/getManagerDetails', managerController.getManagerDetails);
router.put('/updatehotel/:hotelName',managerController.updateHotel);
module.exports = router;
