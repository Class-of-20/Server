const express = require('express');
const router = express.Router();

const userController = require('../Service/roomService');

// '/room' is the default endpoint
router.get('/', (req, res, next) => {
    console.log("default endpoint");
});

// 채팅방 목록
router.get('/:user_idx',userController.readRoom);

module.exports = router;