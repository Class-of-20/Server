const express = require('express');
const mysql = require("mysql2");

const session = require('express-session');
const http = require('http');
const { Server } = require("socket.io");

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

app.use('/room', require('./Router/roomRouter'));

app.use('/chat',require('./Router/chatRouter'));

/*==================================*/ 
const server = app.listen(port, () => {
  console.log("Server is running on port",port);
});

//서버에  socket io 추가
const io = require('socket.io')(server)
const connectedUser = new Set();

//io.on(이벤트 명, 콜백함수)=> 이벤트 수신
io.on('connection', (socket)=>{
  //채팅방 연결 시, 
  console.log("connected Successfully", socket.id);
  connectedUser.add(socket.id);
  io.emit('connected-user',connectedUser.size);
  //채팅방 연결 해제 시,
  socket.on('disconnect', ()=>{
      console.log("disconnected Successfully", socket.id);
      connectedUser.delete(socket.id);
      io.emit('connected-user',connectedUser.size);
  });
  //메세지 보낼 시,
  socket.on('message', (data)=>{
      console.log(data);   
      //해당 소켓을 제외한 나머지 소켓에세 데이터를 전P송
      socket.emit('message-recive', data);
  })
  // "joinChatRoom" 이벤트가 발생하면 콜백 함수 실행
  socket.on("joinChatRoom", async () => {
      // 현재 소켓을 "chatRoom UUID"에 조인
      console.log("joinchatroom");
      socket.join("chatRoom UUID");
      // "chatRoom UUID"에 있는 모든 소켓에게 "hello" 이벤트 emit
      io.to("chatRoom UUID").emit("hello");
  });
})

