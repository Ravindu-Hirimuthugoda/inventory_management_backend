const Lecturer = require('../services/lecturer');

let lecturer = new Lecturer();

const getPendingRequests = async(req,res,next)=>{
    try{
        const response = await lecturer.getPendingList();
        res.send(response);
    }catch(err){
        next(err);
    }
}

const getPendingDetails = async(id)=>{
    const response = await lecturer.getPendingDetails(id);
    //console.log(id);
    return response;
}

const approveRequest = async(id)=>{
    const res = await lecturer.approveRequest(id);
    return res;
}

const rejectRequest = async(id)=>{
    const res = await lecturer.rejectRequest(id);
}

const saveLecturerNormalData = async(detail)=>{
    try{
        const response = await lecturer.saveNormalData(detail);
        return('Suxxessfully save data');
    }catch(error){
        return(error);
    }
}

const saveLecturerTemporyData = async(detail)=>{
    try{
        const response = await lecturer.saveTemporyData(detail);
        return('Suxxessfully save data');
    }catch(error){
        return(error);
    }
}

module.exports = {getPendingRequests,getPendingDetails,approveRequest,rejectRequest,saveLecturerNormalData,saveLecturerTemporyData};