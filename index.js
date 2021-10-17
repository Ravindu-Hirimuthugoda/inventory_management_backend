const sequelize = require('./config/database');
const {checkAvailability,getAllCategories, getModels, getLab, getStoreCode,getAvailabelItems} = require('./controllers/user');
const {getStudentBorrowedItems,getReleventLecturer,saveData,saveStudentTemporyData} = require('./controllers/student-controller');
const {getPendingRequests,getPendingDetails,approveRequest,rejectRequest, saveLecturerNormalData,saveLecturerTemporyData} = require('./controllers/lecturer-controller');
const {Server, Socket} = require('socket.io');
const http = require('http');
const dotenv = require("dotenv");

dotenv.config();



const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const port = 5000 || process.env.PORT;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
// const server = http.createServer(app);

// const io = new Server(server,{
//     cors:{
//         origin: "*",
//         methods: ["GET","POST"],
//     },
// });

// io.on("connection",(socket)=>{
//     console.log(`User connected: ${socket.id}`);

//     socket.on("join_room",(data)=>{
//         socket.join(data);
//         console.log(`User with ID: ${socket.id} joined to the room ${data}`);
//     })
// })

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use(express.json());
app.use(express.urlencoded({extended:true}));







app.listen(port,()=>{
    //console.log(`Server running in ${port}`);
});

module.exports = app;



