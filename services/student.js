const sequelize =require("../config/database");
const borrowing = require('../models/borrowing');
const request = require('../models/request');
const requestBorrowing = require('../models/requestBorrowing');
const temporyBorrowing = require('../models/temporyBorrowing');
const category = require('../models/category');
const model = require('../models/model');
const lab = require('../models/laboratory');
const equipment = require('../models/equipment');
const lecturer = require('../models/lecturer');
const lecturerAllocation = require('../models/lecturerAllocation');
const {Op, where} = require('sequelize');
const StudentModel =require('../models/student_model');

class Student{
    constructor(){
        try{
            sequelize.authenticate();
            //console.log('Database connected');
        }catch(err){
            console.log('Database error', err);
        } 
    }

    async getBorrowedItems(){
        
        borrowing.hasOne(temporyBorrowing);
        borrowing.hasOne(requestBorrowing);

        //const result = await borrowing.findAll({include:[{model:temporyBorrowing,where:{borrowingId:{[Op.ne]:null}}},{model:requestBorrowing,where:{borrowingId:{[Op.ne]:null}}}],raw:true});
        //const result = await borrowing.findAll({where:{[Op.or]:[{includes:temporyBorrowing},{includes:requestBorrowing}]}});
        const result1 = await borrowing.findAll({include:{model:temporyBorrowing,where:{[Op.and]:[{borrowingId:{[Op.ne]:null}},{studentId:{[Op.eq]:'180244B'}}]},attributes:[]},raw:true});
        const result2 = await borrowing.findAll({include:{model:requestBorrowing,where:{[Op.and]:[{borrowingId:{[Op.ne]:null}},{studentId:{[Op.eq]:'180244B'}}]},attributes:[]},raw:true});
        const result = result1.concat(result2);
        //console.log(result);
        //console.log('run here');
        return result;

    }
    async getItemDetails(id){
        category.hasMany(equipment);
        model.hasMany(equipment);
        lab.hasMany(equipment);
        equipment.belongsTo(category);
        equipment.belongsTo(model);
        equipment.belongsTo(lab);
        const result = equipment.findAll({include:[{model:category,attributes:['categoryName']},{model:model,attributes:['modelName']},{model:lab,attributes:['labName']}],where:{id:{[Op.eq]:id}},attributes:['id','imageURL'],raw:true});
        return result;
    }

    async getLecturer(labId){
        lecturer.hasMany(lecturerAllocation);
        lecturerAllocation.belongsTo(lecturer);
        lab.hasMany(lecturerAllocation);
        lecturerAllocation.belongsTo(lab);
        const result = lecturer.findAll({include:[{model:lecturerAllocation,attributes:[]},{model:lecturerAllocation,include:[{model:lab,attributes:[],where:{labName:{[Op.eq]:labId}}}]}],raw:true,attributes:['id','firstName','lastName']});
        return result;
    }

    async saveDataDB(detail){
        console.log('run here 4');
        const transaction = await sequelize.transaction();
        const req= new Date(detail.requestDate).toString();
        const ret = new Date(detail.returnDate).toString();
        const reqDate=this.convert(req);
        const retDate = this.convert(ret);
        //console.log(a);
        console.log(detail);
        

        try{
            const total = await request.count();
            console.log(total);
            const req = await request.create({
                id: total+1,
                status:'pending',
                reason: 'testingSeq',
                requestDate: reqDate,
                returnDate: retDate,
                equipmentId: detail.equipmentId,
                type:'normal',
            },{transaction});

            const borrowingCount = await requestBorrowing.count();

            const reqBorr = await requestBorrowing.create({
                id:borrowingCount+1,
                requestId:total+1,
                borrowingId:null,
                studentId:detail.studentId,
                lecturerId:detail.lecId,
            },{transaction});

            const equpment = await equipment.update({availability:'0'},{where:{id:detail.equipmentId}},{transaction});
            
            console.log('success');
            await transaction.commit();
        }catch(err){
            console.log('Error');
            await transaction.rollback();
        }
    }

    async saveTemoryData(detail){
        const transaction = await sequelize.transaction();
        //console.log(a);
        console.log(detail);

        try{
            const total = await request.count();
            console.log(total);
            const req = await request.create({
                id: total+1,
                status:'pass',
                reason: detail.reason,
                requestDate: detail.requestDate,
                returnDate: detail.returnDate,
                equipmentId: detail.equipmentId,
                type:'tempory',
            },{transaction});

            const borrowingCount = await temporyBorrowing.count();

            const reqBorr = await temporyBorrowing.create({
                id:borrowingCount+1,
                requestId:total+1,
                studentId:detail.studentId,
                borrowingId:null,
            },{transaction});

            const equpment = await equipment.update({availability:'0'},{where:{id:detail.equipmentId}},{transaction});
            
            console.log('success');
            await transaction.commit();
        }catch(err){
            console.log('Error');
            await transaction.rollback();
        }
    }

    convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    //! - uditha --
    async createStudent(index,firstName,lastName,uid,department){
        
        console.log("create Student");
        const student = await StudentModel.create({
           id: index,
           firstName: firstName,
           lastName: lastName,
           department: department,
           userId: uid     
        });
        if(student == null){
            return null;
        }
        console.log(student);
        return student;
    }

    async getStudentByID(index){

        let cnt = await StudentModel.count({where: { id: index }});

        if (cnt > 0) {
            return null;
        }else{                    
                    
            return "no user";         
        }
    }

    async readLastEntry(){
       const students =  await StudentModel.findAll({
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ]]
          });
          if(students == null){
            throw new Error('Something went wrong!');
        }
        console.log(students);
        return students;
    }

    async readAllStudent(){        
        console.log("read student");
        const students = await StudentModel.findAll({

        });
        if(students == null){
            throw new Error('Something went wrong!');
        }
        console.log(students);
        return students;
    
    }

    async updateStudent(firstName,lastName,department){
        await StudentModel.update(
            {
            where:{id:id },raw:true
            },
            {
                firstName: firstName,
                lastName: lastName,
                department:department
            }
        ).success(function(student) { 

           return student;
       
        }).error(function(err) {        
            throw new Error('student not updated');            
        });        
    }


}

module.exports = Student;