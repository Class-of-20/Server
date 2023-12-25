const express = require('express');
const session = require('express-session');
const webSocket =require('./socket');
const app = express();

require("dotenv").config();
const port = process.env.PORT;
const server=app.listen(port, () => { console.log("Server is running on port",port);});
const io = require('socket.io')(server);

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

//라우터 설정
app.use('/user', require('./Router/userRouter'));
app.use('/login', require('./Router/loginRouter'));
app.use('/post', require('./Router/postRouter'));
app.use('/room', require('./Router/roomRouter'));
app.use('/chat',require('./Router/chatRouter'));

webSocket(io);
