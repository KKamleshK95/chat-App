import http from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
const httpServer = http.createServer(app);

const  io = new Server(httpServer,{
    cors:{
        origin: "http://localhost:3001",   //"process.env.Node_ENV === "production" ? false : ['localhost:5000']"
        methods: ["GET", "Post"]
    }
});

io.on('connection' , (socket)=>{
    console.log(`Connected to ${socket.id}`);

    socket.on("joinRoom", (room)=>{
        socket.join(room)
    })
    socket.on('sendMessage', (data) =>{
        // console.log(data)
        // io.emit('message', `${socket.id.substring(0,5)} : ${data}`)
        socket.to(data.room).emit('receiveSms', data)
    })

})

httpServer.listen(3500 , () => console.log('Connected to 3500'))