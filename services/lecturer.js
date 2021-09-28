const sequelize = require("../config/database");
const request = require('../models/request');
const requestBorrowing = require('../models/requestBorrowing');
const temporyBorrowing = require('../models/temporyBorrowing');
const equipment = require('../models/equipment');
const category = require('../models/category');
const model = require('../models/model');
const lab = require('../models/laboratory');
const {Op} = require('sequelize');
const { raw } = require("express");

class Lecturer{
    constructor(){
        try{
            sequelize.authenticate();
            console.log('Database connected');
        }catch(err){
            console.log('Database error', err);
        } 
    }

    async getPendingList(){
        request.hasOne(requestBorrowing);
        equipment.hasMany(request);
        request.belongsTo(equipment);
        
        const result = request.findAll({include:[{model:requestBorrowing,where:{lecturerId:{[Op.eq]:'123456L'}},attributes:['studentId','lecturerId']}],where:{status:{[Op.eq]:'pending'}},attributes:['id','equipmentId','requestDate','returnDate'],raw:true});
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

        const result = equipment.findAll({include:[{model:request,where:{id:{[Op.eq]:iden}},attributes:['id','reason','requestDate','returnDate'],include:[{model:requestBorrowing,attributes:['studentId']}]},{model:category,attributes:['categoryName']},{model:lab,attributes:['labName']},{model:model,attributes:['modelName']}],attributes:['id','imageURL'],raw:true});
        //console.log(result);
        return result;
    }

    async approveRequest(varId){
        const result =request.update({status:'pass'},{where:{id:varId}});
        return result;
    }

    async rejectRequest(varId){
        const result =request.update({status:'fail'},{where:{id:varId}});
        return result;
    }
}

module.exports = Lecturer;