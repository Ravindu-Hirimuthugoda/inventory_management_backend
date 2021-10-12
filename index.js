const sequelize = require('./config/database');
const {checkAvailability,getAllCategories, getModels, getLab, getStoreCode,getAvailabelItems} = require('./controllers/user');
const {getStudentBorrowedItems,getReleventLecturer,saveData,saveStudentTemporyData} = require('./controllers/student-controller');
const {getPendingRequests,getPendingDetails,approveRequest,rejectRequest, saveLecturerNormalData,saveLecturerTemporyData} = require('./controllers/lecturer-controller');


const express = require('express');
const bodyParser = require('body-parser');

const port = 5000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/checkAvaiability',checkAvailability);
app.use('/ava',getAvailabelItems);
app.use('/category',getAllCategories);
app.use('/borrow',getStudentBorrowedItems);
app.use('/pending',getPendingRequests);
app.use('/requestDetail/:id',async(req,res,next)=>{
    try{
        const response= await getPendingDetails(req.params.id);
        //console.log(response);
        res.send(response);
    }catch(err){
        return err;
    }
});
app.use('/model/:category',async(req,res,next)=>{
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

app.listen(process.env.PORT || port,()=>{
    console.log('Server running');
});



