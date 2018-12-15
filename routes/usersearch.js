const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
var urlencoder = bodyParser.urlencoded({ extended: false });
const userSearchController = require('../controllers/usersearch');
router.post('/', urlencoder, userSearchController.usersearch);
router.get('/',  userSearchController.citySearch);
router.get('/managerSearch', userSearchController.managerSearch)
module.exports = router;