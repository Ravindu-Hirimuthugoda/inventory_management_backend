const Student = require('../services/student');

let student = new Student();

const getStudentBorrowedItems = async (id,page)=>{
    try{
        const response = await student.getBorrowedItems(id,page);
        let matches = []
        //console.log('trdpeodmd');
        //console.log(response);
        for(let m of response["result"]){
            let match = await student.getItemDetails(m.equipmentId);
            let newObj = {...match[0],purchesedDate:m.dueDate}
            matches.push(newObj);
        }
        //console.log(matches);
        return {"result":matches,"total":response["total"]};
    }catch(err){
        return(err);
    }
}

const getReleventLecturer = async(labId)=>{
    try{
        const result = await student.getLecturer(labId);
        if(result){
            return(result);
        }else{
            return('Error')
        }
    }catch(err){
        return(err);
    }
}

const saveData = async(detail)=>{
    console.log('run gere 2');
    try{
        console.log('run here 3');
        const response = await student.saveDataDB(detail);
        return('Suxxessfully save data');
    }catch(error){
        return(error);
    }
}

const saveStudentTemporyData = async(detail)=>{
    try{
        const response = await student.saveTemoryData(detail);
        return('Successfully save data');
    }catch(error){
        return(error);
    }
}

const saveNotification = async(detail)=>{
    try{
        const response = await student.saveNotificationByStudent(detail);
        return('Successfully save data');
    }catch(error){
        return(error);
    }
}

const markNotification = async(detail)=>{
    try{
        const response = await student.markNotification(detail);
        return('success');
    }catch(err){
        return(err);
    }
}

module.exports = {getStudentBorrowedItems,getReleventLecturer,saveData,saveStudentTemporyData,saveNotification,markNotification}