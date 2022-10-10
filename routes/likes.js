const express = require('express');
const router = express.Router();
const likeController = require('../controller/like_controller'); 


router.get('/toggle/:id', likeController.toggleLike);

module.exports = router;