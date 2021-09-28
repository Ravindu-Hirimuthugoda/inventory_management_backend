const Student = require('../services/student');

let student = new Student();

const getStudentBorrowedItems = async (req,res,next)=>{
    try{
        const response = await student.getBorrowedItems();
        let matches = []
        //console.log(response);
        for(let m of response){
            let match = await student.getItemDetails(m.itemId);
            let newObj = {...match[0],purchesedDate:m.dueDate}
            matches.push(newObj);
        }
        //console.log(matches);
        res.send(matches); 
    }catch(err){
        next(err);
    }
}


module.exports = {getStudentBorrowedItems}