const express = require('express');
const mysql = require("mysql2");
const session = require('express-session');
const http = require('http');
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

//미틀웨어 및 라우터 설정
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
app.use('/post', require('./Router/postRouter'));

//소켓 설정
const io = new Server(server, {
    cors: {
      origin: "http://cloud.swdev.kr:4007",
      methods: ["GET", "POST"]
    }
  }
);
require("./utils/io")(io);
app.get("room/:idx", (req, res) => {
    const idx = req.params.idx;
    res.send(`Room ${idx}에 대한 정보를 보여주는 페이지`);
  }
);

app.listen(8080, () => {
    console.log("Server is running on port 8080.");
});
