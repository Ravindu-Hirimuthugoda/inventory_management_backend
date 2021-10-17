const sequelize = require('./config/database');
const {checkAvailability,getAllCategories, getModels, getLab, getStoreCode,getAvailabelItems} = require('./controllers/user');
const {getStudentBorrowedItems,getReleventLecturer,saveData,saveStudentTemporyData} = require('./controllers/student-controller');
const {getPendingRequests,getPendingDetails,approveRequest,rejectRequest, saveLecturerNormalData,saveLecturerTemporyData} = require('./controllers/lecturer-controller');
const {Server, Socket} = require('socket.io');
const http = require('http');


const express = require('express');
const bodyParser = require('body-parser');

const port = 5000 || process.env.PORT;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

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
app.get('/checkAvaiability',checkAvailability);
app.get('/ava',getAvailabelItems);
app.get('/category',getAllCategories);
app.get('/borrow',getStudentBorrowedItems);
app.get('/pending',getPendingRequests);
app.get('/requestDetail/:id',async(req,res,next)=>{
    try{
        const response= await getPendingDetails(req.params.id);
        //console.log(response);
        res.send(response);
    }catch(err){
        return err;
    }
});
app.get('/model/:category',async(req,res,next)=>{
    try{
        const response = await getModels(req.params.category);
        res.send(response);
    }catch(err){
        next(err);
    }
});

app.get('/lab/:category/:model',async(req,res,next)=>{
    
    try{
        const response = await getLab(req.params.category,req.params.model);
        //console.log(response);
        res.send(response);
    }catch(err){
        next(err);
    }
});


app.get('/storeCode/:category/:model/:lab',async(req,res,next)=>{
    try{
        const response= await getStoreCode(req.params.category,req.params.model,req.params.lab);
        console.log(response);
        res.send(response);
    }catch(err){
        next(err);
    }
});




app.post('/approve/:id',async(req,res,next)=>{
    try{
        const response =await approveRequest(req.params.id);
        res.send(response);
    }catch(err){
        return err;
    }
});

app.post('/reject/:id',async(req,res,next)=>{
    try{
        const response =await rejectRequest(req.params.id);
        res.send(response);
    }catch(err){
        return err;
    }
});

app.get('/lecturer/:labid',async(req,res,next)=>{
    try{
        const response = await getReleventLecturer(req.params.labid);
        res.send(response);
    }catch(err){
        next(err);
    }
});

app.post('/student/sendNormalRequest',async(req,res,next)=>{
    console.log(req.body);
    try{
        const response = await saveData(req.body);
        res.send(req.body);
    }catch(err){
        next(err);
    }
});

app.post('/lecturer/sendNormalRequest',async(req,res,next)=>{
    console.log(req.body);
    try{
        const response = await saveLecturerNormalData(req.body);
        res.send(req.body);
    }catch(err){
        next(err);
    }
});

app.post('/lecturer/sendTemporyRequest',async(req,res,next)=>{
    console.log(req.body);
    try{
        const response = await saveLecturerTemporyData(req.body);
        res.send(req.body);
    }catch(err){
        next(err);
    }
});

app.post('/student/sendTemporyRequest',async(req,res,next)=>{
    console.log(req.body);
    try{
        const response= await saveStudentTemporyData(req.body);
        res.send(req.body);
    }catch(err){
        next(err);
    }
})

app.post('/test',async(req,res,next)=>{
    res.send('Happy');
});

app.listen(port,()=>{
    //console.log(`Server running in ${port}`);
});

module.exports = app;



