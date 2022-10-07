const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

router.get('/',  homeController.forgot);
router.post('/forgottenPassword', homeController.forgottenPassword);
router.post('/changePassword/:id', homeController.changePassword);
module.exports = router;