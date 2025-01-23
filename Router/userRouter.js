const express = require('express');
const router = express.Router();

const userController = require('../Service/userService');

// '/user' is the default endpoint
router.get('/', (req, res, next) => {
    console.log("default endpoint");
});

// 회원가입
router.post('/create', userController.postCreateUser);
router.post('/create/checkId', userController.checkDuplicateId);
router.post('/create/checkName', userController.checkDuplicateName);

// 회원 정보 수정
router.post('/update', userController.postUpdateUser);

// 회원 탈퇴
router.post('/destroy', userController.postDestroyUser);

module.exports = router;