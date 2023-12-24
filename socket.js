module.exports = (io) => {
    const connectedUser = new Set();
    const Chat = require('./Model/chat');
    // io.on(이벤트 명, 콜백함수)=> 이벤트 수신
    io.on('connection', (socket) => {
      // 채팅방 연결 시,
      console.log("connected Successfully", socket.id);
      connectedUser.add(socket.id);
      io.emit('connected-user', connectedUser.size);
  
      // 채팅방 연결 해제 시,
      socket.on('disconnect', () => {
        console.log("disconnected Successfully", socket.id);
        connectedUser.delete(socket.id);
        io.emit('connected-user', connectedUser.size);
      });
  
      // "joinChatRoom" 이벤트가 발생하면 콜백 함수 실행
      socket.on("joinChatRoom", async (post_idx) => {
        console.log(post_idx, "번 방에 입장하셨습니다.");
        try {
          // 현재 소켓을 "chatRoom UUID"에 조인
          console.log("joinchatroom");
          socket.join(post_idx);

        } catch (error) {
          console.error('Error joining chat room:', error);
        }
      });

      // 사용자가 채팅을 쳤을 때
      socket.on('sendText', async (value) => {
        try {
          const user_idx=value.user_idx;
          const post_idx =value.post_idx;
          const text = value.text;
          const updatedAt = value.updatedAt;

          // chats 테이블에 데이터 추가
          const chat = await Chat.create({ 
              user_idx: user_idx, 
              post_idx: post_idx, 
              text:text,
              //updatedAt: updatedAt
            });

          // 추가된 데이터를 해당 방에 속한 모든 클라이언트에게 전송
          io.to(post_idx).emit('getChatText', chat.toJSON());
        } catch (error) {
          console.error('Error sendText:', error);
        }
      });

      // 채팅방 떠나기
      socket.on('leaveRoom', (post_idx) => {
        socket.leave(post_idx);
        console.log(post_idx, "번 방에서 퇴장하였습니다.");
      })
    });
  };