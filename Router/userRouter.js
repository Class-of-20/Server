const express = require('express');
const router = express.Router();

const userController = require('../Controller/userController');

// '/user' is the default endpoint
router.get('/', (req, res, next) => {
    console.log("default endpoint");
});

// 회원가입
router.post('/create', userController.postCreateUser);

module.exports = router;