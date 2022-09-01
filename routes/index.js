const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

console.log('router loaded');

router.get('/', homeController.home);
router.get('/login', homeController.login);
router.get('/profile', homeController.profile);
router.post('/destroy', homeController.destroy );
router.post('/create', homeController.create);
router.post('/session', homeController.session);
module.exports = router;