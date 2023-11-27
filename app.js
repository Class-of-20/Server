const express = require('express');
const mysql = require("mysql2");
const session = require("express-session");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(session({
    key: 'sessionIdx',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24000 * 60 * 60     // 쿠키 유효기간 24시간
    }
}));

app.use('/user', require('./Router/userRouter'));

app.use('/login', require('./Router/loginRouter'));

app.use('/post', require('./Router/postRouter'));

app.listen(8080, () => {
    console.log("Server is running on port 8080.");
});