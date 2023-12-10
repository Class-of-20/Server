module.exports=function(io){
    io.on('connection', async(socket) => {
        console.log('새로운 사용자가 연결되었습니다.', socket.id),
        socket.on('chat message', (message) => {
            console.log('수신한 메시지:', message);
            io.emit('chat message', message);
        })
    });
};

