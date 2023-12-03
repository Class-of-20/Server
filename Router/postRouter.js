const express = require('express');
const router = express.Router();

const userController = require('../Service/postService');

// '/post' is the default endpoint
router.get('/', (req, res, next) => {
    console.log("default endpoint");
});

// 게시글 작성
router.post('/create', userController.createPost);

// 게시글 읽기
router.get('/:idx',userController.readPostByIdx);

module.exports = router;