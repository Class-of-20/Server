const express = require('express');
const router = express.Router();

const userController = require('../Service/roomService');

// 채팅방 정렬
router.get('/',userController.readRoom);

//채팅방 참여
router.get('/join', userController.joinRoom);

module.exports = router;