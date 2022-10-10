const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

router.get('/',  homeController.forgot);
router.post('/reset_password', homeController.resetPassword);
router.post('/changePassword/:id', homeController.changePassword);
module.exports = router;