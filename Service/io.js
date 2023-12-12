module.exports=function(io){
    console.log('utils/io.js 파일이 실행되었습니다.');
    io.on('connection',(socket) => {
        console.log('새로운 사용자가 연결되었습니다.', socket.id),
        socket.on('chat message', (message) => {
            console.log('수신한 메시지:', message);
            io.emit('chat message', message);
        })
    });
};

