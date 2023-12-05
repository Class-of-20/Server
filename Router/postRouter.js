const express = require('express');
const router = express.Router();

const userController = require('../Service/postService');

// '/post' is the default endpoint
router.get('/', (req, res, next) => {
    console.log("default endpoint");
});

// 게시글 작성
router.post('/create', userController.createPost);
router.delete('/:idx', userController.deletePost);

// 게시글 읽기
router.get('/:idx',userController.readPostByIdx);

// 게시글 정렬
router.get('/sort/latest',userController.sortPostByLatest);     // 최신순
router.get('/sort/menu',userController.sortPostByMenu);        // 메뉴
router.get('/sort/meetDate',userController.sortPostByMeet);    // 만남일자
router.get('/sort/people',userController.sortPostByPeople);    // 인원수
router.get('/sort/address',userController.sortPostByAddress);  // 주소

module.exports = router;