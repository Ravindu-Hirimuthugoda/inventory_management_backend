const {checkAvailability,getAllCategories, getModels, getLab, getStoreCode,getAvailabelItems,getNotification,getEquipmetCount, checkItemByCategory,getItemCount,checkAvailabilitymobile} = require('../../controllers/user');
const { getStudentBorrowedItems,getStudentBorrowedItemsmobile, getReleventLecturer, saveData, saveStudentTemporyData, saveNotification, markNotification } = require('../../controllers/student-controller');
const { getPendingRequests, getPendingDetails, approveRequest, rejectRequest, saveLecturerNormalData, saveLecturerTemporyData } = require('../../controllers/lecturer-controller');
const express = require('express');
const Student = require('../../services/student');
const student= new Student();



const router = express.Router();
 
router.get('/checkAvaiability',async(req,res,next)=>{
    try{
        const response = await checkAvailability(req.query.qstr);
        res.send(response);
    }catch(e){
        next(e);
    }
});

router.get('/checkAvaiabilitymobile',checkAvailabilitymobile);

router.get('/checkItemsByCategory',async(req,res,next)=>{
    try{
        console.log(req.query.qstr);
        console.log(req.query.page);
        const response = await checkItemByCategory(req.query.qstr,req.query.page);
        res.send(response);
    }catch(e){
        next(e);
    }
});

router.get('/itemCount',async(req,res,next)=>{
    try{
        const response = await getItemCount(req.query.qstr);
        res.send({"count":response});
        //console.log('running here')
    }catch(err){
        next(err);
    }
});


router.get('/equipmentCount',getEquipmetCount);
router.get('/ava',getAvailabelItems);
router.get('/category',getAllCategories);
router.get('/borrow/:id',async(req,res,next)=>{
    try{
        const response = await getStudentBorrowedItems(req.params.id,req.query.qstr);
        res.send(response);
    }catch(err){
        next(err);
    }
});

router.get('/borrowmobile/:id',async(req,res,next)=>{
    try{
        console.log('final response');
        const response = await getStudentBorrowedItemsmobile(req.params.id);
        console.log(response.length);
        res.send(response);
    }catch(err){
        next(err);
    }
});



router.get('/model/:category',async(req,res,next)=>{
    try{
        const response = await getModels(req.params.category);
        res.send(response);
    }catch(err){
        next(err);
    }
});

router.get('/getNotification/:id',async(req,res,next)=>{
    try{
        const response = await getNotification(req.params.id);
        res.send(response);
    }catch(err){
        next(err);
    }
})

router.get('/lab/:category/:model',async(req,res,next)=>{
    
    try{
        const response = await getLab(req.params.category,req.params.model);
        //console.log(response);
        res.send(response);
    }catch(err){
        next(err);
    }
});


router.get('/storeCode/:category/:model/:lab',async(req,res,next)=>{
    try{
        const response= await getStoreCode(req.params.category,req.params.model,req.params.lab);
        console.log(response);
        res.send(response);
    }catch(err){
        next(err);
    }
});



router.get('/lecturer/:labid',async(req,res,next)=>{
    try{
        const response = await getReleventLecturer(req.params.labid);
        res.send(response);
    }catch(err){
        next(err);
    }
});

router.post('/sendNormalRequest',async(req,res,next)=>{
    console.log(req.body);
    try{
        const response = await saveData(req.body);
        res.send(req.body);
    }catch(err){
        next(err);
    }
});

router.post('/sendTemporyRequest',async(req,res,next)=>{
    console.log(req.body);
    try{
        const response= await saveStudentTemporyData(req.body);
        res.send(req.body);
    }catch(err){
        next(err);
    }
});

router.post('/sendNotification',async(req,res,next)=>{

    console.log(req.body);
    try{
        const response = await saveNotification(req.body);
        res.send(req.body);
    }catch(err){
        next(err);
    }
});

router.post('/markNotification',async(req,res,next)=>{
    try{
        console.log(req.body);
        const response = await markNotification(req.body);
        res.send(req.body);
    }catch(err){
        next(err);
    }
});

router.get('/getmail',async(req,res,next)=>{
    try{
        const data= await student.getlecEmail();
        res.send(data);
    }catch(err){
        next(err);
    }
})
module.exports = router;