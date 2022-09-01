const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');
const passport = require('passport');

console.log('router loaded');

router.get('/', homeController.home);
router.get('/login', homeController.login);
router.get('/profile', passport.checkAuthentication ,homeController.profile);
router.post('/destroy', homeController.destroy );
router.post('/create', homeController.create);
router.post('/session', passport.authenticate('local', {failureRedirect: '/login'}), homeController.session);
module.exports = router;