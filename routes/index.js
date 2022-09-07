const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');
const passport = require('passport');

console.log('router loaded');

router.get('/signup', homeController.signup);
router.get('/', homeController.login);
router.get('/home', passport.checkAuthentication ,homeController.home);
router.get('/home/profile', passport.checkAuthentication, homeController.profile);

//post methods
router.post('/destroy', homeController.destroy );
router.post('/create', homeController.create);
router.post('/session', passport.authenticate('local', {failureRedirect: '/'}), homeController.session);
//use methods
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));

module.exports = router;