const express = require('express');
const router = express.Router();

const loginService = require('../Service/loginService');

// '/login' is the default endpoint
router.get('/', (req, res, next) => {
    router.post(loginService);
});

module.exports = router;