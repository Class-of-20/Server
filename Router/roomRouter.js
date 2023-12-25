const express = require('express');
const router = express.Router();

const userController = require('../Service/roomService');

// '/room' is the default endpoint
router.get('/', (req, res, next) => {
    console.log("default endpoint");
});

// 채팅방 정렬
router.get('/',userController.readRoom);

//채팅방 참여
router.get('/join', userController.joinRoom);

//작성자 여부 확인
router.get('/check',userController.checkPermission);

//권한 부여
router.get('/grant',userController.grantCheck);

//채팅방 유저 조회
router.get('/user/', userController.readRoomUser);

//채팅방 삭제
router.delete('/delete/', userController.deleteRoom);

module.exports = router;