const {checkAvailability,getAllCategories, getModels, getLab, getStoreCode,getAvailabelItems} = require('../../controllers/user');
const { getStudentBorrowedItems, getReleventLecturer, saveData, saveStudentTemporyData } = require('../../controllers/student-controller');
const { getPendingRequests, getPendingDetails, approveRequest, rejectRequest, saveLecturerNormalData, saveLecturerTemporyData } = require('../../controllers/lecturer-controller');

const express = require('express');

const router = express.Router();
 
router.get('/checkAvaiability',checkAvailability);
router.get('/ava',getAvailabelItems);
router.get('/category',getAllCategories);
router.get('/borrow',getStudentBorrowedItems);

router.get('/model/:category',async(req,res,next)=>{
    try{
        const response = await getModels(req.params.category);
        res.send(response);
    }catch(err){
        next(err);
    }
});

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
})
module.exports = router;