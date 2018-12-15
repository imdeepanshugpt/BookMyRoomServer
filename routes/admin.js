const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const adminController = require('../controllers/admin');
const adminLogin = require('../controllers/adminlogin');
const middleware = require('../middleware/auth');
router.use(bodyParser.json());

router.get('/createAdmin', adminController.createAdmin);
router.post('/adminAccess', adminController.adminAccess);
router.post('/delete', middleware.Authenticate, adminController.deleteHotel);
router.post('/add', adminController.addHotel);
router.post('/generatecoupon', adminController.generateCoupon);
router.post('/adminlogin', adminLogin.verifylogin);
router.put('/updatehotel/:hotelName', middleware.Authenticate,adminController.updateHotel);

module.exports = router;