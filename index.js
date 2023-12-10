const {createServer} = require("http")
const app = require("./app")
const {Server} = require("socket.io")
require("dotenv").config();

const httpServer = createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin:"http://cloud.swdev.kr:4007/chat/:room_idx"
    }
})

require("./utils/io")(io);
httpServer.listen(process.env.PORT,()=>{
    console.log("서버 8080연결")
})
