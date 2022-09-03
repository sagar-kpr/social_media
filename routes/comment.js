const express = require('express');
const router = express.Router();
const passport = require('passport');
const commentController = require('../controller/comment_controller');

router.post('/create', passport.checkAuthentication, commentController.create);

module.exports = router;
