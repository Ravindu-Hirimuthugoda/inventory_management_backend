const {checkAvailability,getAllCategories, getModels, getLab, getStoreCode,getAvailabelItems} = require('../../controllers/user');
const {getPendingRequests,getPendingDetails,approveRequest,rejectRequest, saveLecturerNormalData,saveLecturerTemporyData,saveNotification} = require('../../controllers/lecturer-controller');
const express = require('express');
const router = express.Router();
router.post('/sendNormalRequest',async(req,res,next)=>{
    console.log(req.body);
    try{
        const response = await saveLecturerNormalData(req.body);
        res.send(req.body);
    }catch(err){
        next(err);
    }
});

router.post('/sendTemporyRequest',async(req,res,next)=>{
    console.log(req.body);
    try{
        const response = await saveLecturerTemporyData(req.body);
        res.send(req.body);
    }catch(err){
        next(err);
    }
});


router.get('/requestDetail/:id',async(req,res,next)=>{
    try{
        const response= await getPendingDetails(req.params.id);
        //console.log(response);
        res.send(response);
    }catch(err){
        return err;
    }
});


router.post('/approve/:id',async(req,res,next)=>{
    try{
        console.log('fire');
        console.log(req.params.id);
        console.log(req.body);
        const response =await approveRequest(req.body);
        res.send(response);
    }catch(err){
        next(err);
    }
});

router.post('/reject/:id',async(req,res,next)=>{
    try{
        const response =await rejectRequest(req.body);
        res.send(response);
    }catch(err){
        next(err);
    }
});

router.get('/pending/:id',async(req,res,next)=>{
    try{
        const response = await getPendingRequests(req.params.id);
        res.send(response);
    }catch(err){
        return(err);
    }
});


router.post('/test',async(req,res,next)=>{
    res.send('Hroutery');
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

module.exports = router;