const express = require('express');
const router = express.Router();
const chatController = require('../controller/chat_controller');


router.post('/chat_toggle', chatController.createChat);

module.exports = router;