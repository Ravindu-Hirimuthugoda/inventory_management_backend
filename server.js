const server = require('./index');
const port = 5000;
const dotenv = require("dotenv");
const {Server} = require("socket.io");
const http = require("http");

const srver = http.createServer(server);

const io = new Server(srver,{
    cors: {
        origin: "https://sep-14.netlify.app",
        methods: ["GET","POST"],
    },
});

let onlineUsers = [];

const addNewUser = (username,socketId)=>{
    !onlineUsers.some((user)=> user.username === username) &&
        onlineUsers.push({username,socketId});
};

const removeUser = (socketId)=>{
    onlineUsers = onlineUsers.filter((user)=> user.socketId !==socketId);
};

const getUser = (username)=>{
    return onlineUsers.find((user)=>user.username === username);
}

io.on("connection",(socket)=>{
    
    socket.on("newUser",(username)=>{
        console.log(`${username} is connected via socket ${socket.id}`);
        addNewUser(username,socket.id);
    });

    socket.on("sendNotification",({senderId, receiverId, message})=>{
        console.log(onlineUsers);
        const reciver = getUser(receiverId);
        if(reciver !=null){
            io.to(reciver.socketId).emit("getNotification",{
                senderId,
                message,
            });
        }
    });

    socket.on("disconnect", ()=>{
        console.log(`user is disconnected`);
        removeUser(socket.id);
    });
});

console.log(onlineUsers);

srver.listen(process.env.PORT || port, () => {
    console.log(`running ${port}`);
});

module.exports = server;
