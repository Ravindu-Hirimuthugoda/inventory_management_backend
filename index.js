// const express = require("express");
// const bodyParser = require('body-parser');
// const cors = require("cors");

// const app = express();

// const router = require("./routes");


// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
// app.use(cors());
// app.use('/',router);


// app.listen(5000,(req,res)=>{
//     console.log("Server start");
// });

const express = require("express");
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');

const port = 5000;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use('/', routes);

app.listen(port, () => {
    console.log(`running ${port}`);
});

// const sequelize = require('./config/database');
// const {checkAvailability,getAllCategories, getModels, getLab, getStoreCode,getAvailabelItems} = require('./controllers/user');
// const {getStudentBorrowedItems,getReleventLecturer,saveData,saveStudentTemporyData} = require('./controllers/student-controller');
// const {getPendingRequests,getPendingDetails,approveRequest,rejectRequest, saveLecturerNormalData,saveLecturerTemporyData} = require('./controllers/lecturer-controller');
// const {Server, Socket} = require('socket.io');
// const http = require('http');
// const dotenv = require("dotenv");
// const cors = require('cors');


// dotenv.config();



// const express = require('express');
// const bodyParser = require('body-parser');
// const routes = require('./routes');
// const port = 5000 || process.env.PORT;
// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/', routes);
// // const server = http.createServer(app);

// // const io = new Server(server,{
// //     cors:{
// //         origin: "*",
// //         methods: ["GET","POST"],
// //     },
// // });

// // io.on("connection",(socket)=>{
// //     console.log(`User connected: ${socket.id}`);

// //     socket.on("join_room",(data)=>{
// //         socket.join(data);
// //         console.log(`User with ID: ${socket.id} joined to the room ${data}`);
// //     })
// // })

// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// //app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));







// app.listen(port,()=>{
//     //console.log(`Server running in ${port}`);
// });

// module.exports = app;



// const express = require("express");
// const app = express();
// const routes = require('./routes');
// const bodyParser = require('body-parser');

// const port = 5000;
// const cors = require('cors');
// app.use(cors());
// app.use(bodyParser.json({ limit: '30mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// app.use('/', routes);

// app.listen(port, () => {
//     console.log(`running ${port}`);
// });
