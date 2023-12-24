const express = require('express');
const router = express.Router();

const userController = require('../Service/roomService');

// '/room' is the default endpoint
router.get('/', (req, res, next) => {
    console.log("default endpoint");
});

// 채팅방 생성
router.post('/create', userController.createRoom);

// 채팅방 목록
router.get('/:user_idx',userController.readRoom);

//채팅방 유저 조회
router.get('/user/:post_idx', userController.readRoomUser);

module.exports = router;