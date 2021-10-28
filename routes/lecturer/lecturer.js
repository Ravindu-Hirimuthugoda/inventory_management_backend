const {checkAvailability,getAllCategories, getModels, getLab, getStoreCode,getAvailabelItems} = require('../../controllers/user');
const {getPendingRequests,getPendingDetails,routerroveRequest,rejectRequest, saveLecturerNormalData,saveLecturerTemporyData} = require('../../controllers/lecturer-controller');
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


router.post('/test',async(req,res,next)=>{
    res.send('Hroutery');
});

module.exports = router;