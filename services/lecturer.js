const sequelize = require("../config/database");
const request = require('../models/request');
const requestBorrowing = require('../models/requestBorrowing');
const temporyBorrowing = require('../models/temporyBorrowing');
const equipment = require('../models/equipment');
const category = require('../models/category');
const model = require('../models/model');
const lab = require('../models/laboratory');
const {Op} = require('sequelize');
const lecturerBorrowing = require('../models/lecturerBorrowing');

class Lecturer{
    constructor(){
        try{
            sequelize.authenticate();
            //console.log('Database connected');
        }catch(err){
            //console.log('Database error', err);
        } 
    }

    async getPendingList(){
        request.hasOne(requestBorrowing);
        equipment.hasMany(request);
        request.belongsTo(equipment);
        
        const result = await request.findAll({include:[{model:requestBorrowing,where:{lecturerId:{[Op.eq]:'123456L'}},attributes:['studentId','lecturerId']}],where:{status:{[Op.eq]:'pending'}},attributes:['id','equipmentId','requestDate','returnDate'],raw:true});
        //console.log(result);
        return result;
    }

    async getPendingDetails(iden){
        equipment.hasMany(request);
        request.belongsTo(equipment);
        category.hasMany(equipment);
        model.hasMany(equipment);
        lab.hasMany(equipment);
        equipment.belongsTo(category);
        equipment.belongsTo(model);
        equipment.belongsTo(lab);
        request.hasOne(requestBorrowing);

        //console.log(id);

        const result = await equipment.findAll({include:[{model:request,where:{id:{[Op.eq]:iden}},attributes:['id','reason','requestDate','returnDate'],include:[{model:requestBorrowing,attributes:['studentId']}]},{model:category,attributes:['categoryName']},{model:lab,attributes:['labName']},{model:model,attributes:['modelName']}],attributes:['id','imageURL'],raw:true});
        //console.log(result);
        return result;
    }

    async approveRequest(varId){
        const result =await request.update({status:'pass'},{where:{id:varId}});
        return result;
    }

    async rejectRequest(varId){
        const result =await request.update({status:'fail'},{where:{id:varId}});
        return result;
    }

    async saveNormalData(detail){
        const transaction = await sequelize.transaction();
        const req= new Date(detail.requestDate).toString();
        const ret = new Date(detail.returnDate).toString();
        const reqDate=this.convert(req);
        const retDate = this.convert(ret);
        //console.log(a);
        //console.log(detail);

        try{
            const total = await request.count();
            console.log(total);
            const req = await request.create({
                id: total+1,
                status:'pass',
                reason: 'testiingLecNormal',
                requestDate: reqDate,
                returnDate: retDate,
                equipmentId: detail.equipmentId,
                type:'normal',
            },{transaction});

            const borrowingCount = await lecturerBorrowing.count();

            const reqBorr = await lecturerBorrowing.create({
                id:borrowingCount+1,
                requestId:total+1,
                lecturerId:detail.lecId,
                borrowingId:null,
            },{transaction});

            const equpment = await equipment.update({availability:'0'},{where:{id:detail.equipmentId}},{transaction});
            
            //console.log('success');
            await transaction.commit();
        }catch(err){
            //console.log('Error');
            await transaction.rollback();
        }
    }

    async saveTemporyData(detail){
        const transaction = await sequelize.transaction();
        //console.log(a);
        //console.log(detail);

        try{
            const total = await request.count();
            //console.log(total);
            const req = await request.create({
                id: total+1,
                status:'pass',
                reason: detail.reason,
                requestDate: detail.requestDate,
                returnDate: detail.returnDate,
                equipmentId: detail.equipmentId,
                type:'tempory',
            },{transaction});

            const borrowingCount = await lecturerBorrowing.count();

            const reqBorr = await lecturerBorrowing.create({
                id:borrowingCount+1,
                requestId:total+1,
                lecturerId:detail.lecId,
                borrowingId:null,
            },{transaction});

            const equpment = await equipment.update({availability:'0'},{where:{id:detail.equipmentId}},{transaction});
            
            //console.log('success');
            await transaction.commit();
        }catch(err){
            //console.log('Error');
            await transaction.rollback();
        }
    }

    convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
}

module.exports = Lecturer;