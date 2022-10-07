const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');
const passport = require('passport');

console.log('router loaded');

router.get('/signup', homeController.signup);
router.get('/', homeController.login);
router.get('/home', passport.checkAuthentication ,homeController.home);
router.get('/home/profile/:id', passport.checkAuthentication, homeController.profile);
router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/'}), homeController.session);


//post methods
router.post('/destroy', homeController.destroy );
router.post('/create', homeController.create);
router.post('/session', passport.authenticate('local', {failureRedirect: '/'}), homeController.session);
router.post('/change/:id', passport.checkAuthentication, homeController.change );
router.post('/change2/:id', passport.checkAuthentication, homeController.change2 );

//use methods
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));
router.use('/identity', require('./identity'));

router.use('/api', require('./api') );

module.exports = router;