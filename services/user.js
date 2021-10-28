const sequelize = require("../config/database");
const category = require('../models/category');
const model = require('../models/model');
const lab = require('../models/laboratory');
const equipment = require('../models/equipment');
const request = require('../models/request');
const { Op } = require("sequelize");

class User{

    constructor(){
        try{
            sequelize.authenticate();
            //console.log('Database connected');
        }catch(err){
            console.log('Database error', err);
        }
    }

    async getItemDetails(){
        category.hasMany(equipment);
        model.hasMany(equipment);
        lab.hasMany(equipment);
        equipment.belongsTo(category);
        equipment.belongsTo(model);
        equipment.belongsTo(lab);
        const details = await equipment.findAll({include:[{model:category,attributes:['categoryName']},{model:lab,attributes:['labName']},{model:model,attributes:['modelName']}],attributes:['id','imageURL','availability'],raw:true});
        console.log(details);
        return details;
    }

    async getAvailableItems(){
        category.hasMany(equipment);
        model.hasMany(equipment);
        lab.hasMany(equipment);
        equipment.belongsTo(category);
        equipment.belongsTo(model);
        equipment.belongsTo(lab);
        const details = await equipment.findAll({include:[{model:category,attributes:['categoryName']},{model:lab,attributes:['labName']},{model:model,attributes:['modelName']}],where:{availability:{[Op.eq]:'1'}},attributes:['id','imageURL','availability',],raw:true});
        //console.log(details);
        return details;
    }

    async getCategories(){
        category.hasMany(equipment);
        equipment.belongsTo(category);
        const result = await equipment.findAll({include:[{model:category,attributes:['categoryName']}],where:{availability:{[Op.eq]:'1'}},attributes:[],raw:true});
        //console.log(result);
        return result;
    }

    async getModels(categoryName){
        category.hasMany(equipment);
        equipment.belongsTo(category);
        model.hasMany(equipment);
        equipment.belongsTo(model);
        const result = await equipment.findAll({include:[{model:category,where:{categoryName:{[Op.eq]:categoryName}},attributes:['categoryName']},{model:model,attributes:['modelName']}],where:{availability:{[Op.eq]:'1'}},attributes:[],raw:true});
        console.log(result);
        return result;
    }

    async getLab(categoryName,modelName){
        category.hasMany(equipment);
        model.hasMany(equipment);
        lab.hasMany(equipment);
        equipment.belongsTo(category);
        equipment.belongsTo(model);
        equipment.belongsTo(lab);
        const result = await equipment.findAll({include:[{model:category,where:{categoryName:{[Op.eq]:categoryName}},attributes:[]},{model:model,where:{modelName:{[Op.eq]:modelName}},attributes:[]},{model:lab,attributes:['labName']},],where:{availability:{[Op.eq]:'1'}},raw:true,attributes:[]});
        //console.log(result);
        return result;
    }

    async getStoreCode(categoryName,modelName,labName){
        category.hasMany(equipment);
        model.hasMany(equipment);
        lab.hasMany(equipment);
        equipment.belongsTo(category);
        equipment.belongsTo(model);
        equipment.belongsTo(lab);
        const result = await equipment.findAll({include:[{model:category,where:{categoryName:{[Op.eq]:categoryName}},attributes:[]},{model:model,where:{modelName:{[Op.eq]:modelName}},attributes:[]},{model:lab,where:{labName:{[Op.eq]:labName}},attributes:[]},],where:{availability:{[Op.eq]:'1'}},raw:true,attributes:['id']});
        console.log(result);
        return result;
    }

    async getReturnDate(id){
        const result = await request.findAll({where:{equipmentId:id},attributes:['returnDate']});
        //console.log(result);
        return result;
    }

}

module.exports = User;