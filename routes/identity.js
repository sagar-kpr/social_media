const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

router.get('/',  homeController.forgot);
router.post('/resetPassword', homeController.reset_password);
router.get('/changePassword/:id', homeController.change_password);
router.post('/changePassword/:id', homeController.change_password);
module.exports = router;