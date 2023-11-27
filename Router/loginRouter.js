const express = require('express');
const router = express.Router();

const loginService = require('../Service/loginService');
const userController = require("../Service/postService");

// '/login' is the default endpoint
router.get('/', (req, res, next) => {
    console.log("default endpoint");
});

router.post('/', loginService.login);

module.exports = router;