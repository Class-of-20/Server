const express = require('express');
const router = express.Router();
const userController = require('../Service/chatService');

router.get('/', userController.loadChat);

module.exports = router;