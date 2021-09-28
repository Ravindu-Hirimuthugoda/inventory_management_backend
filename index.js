const sequelize = require('./config/database');
const {checkAvailability,getAllCategories, getModels, getLab, getStoreCode,getAvailabelItems} = require('./controllers/user');
const {getStudentBorrowedItems} = require('./controllers/student-controller');
const {getPendingRequests,getPendingDetails,approveRequest,rejectRequest} = require('./controllers/lecturer-controller');


const express = require('express');
const port = 5000;
const app = express();




app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/checkAvaiability',checkAvailability);
app.use('/ava',getAvailabelItems);
app.use('/category',getAllCategories);
app.get('/models',(req,res)=>{console.log(req.body)});
app.use('/lab',getLab);
app.use('/store',getStoreCode);
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
app.post('/approve/:id',async(req,res,next)=>{
    const response =await approveRequest(req.params.id);
    res.send(response);
});

app.post('/reject/:id',async(req,res,next)=>{
    const response =await rejectRequest(req.params.id);
    res.send(response);
});



app.listen(port,()=>{
    console.log('Server running');
});



