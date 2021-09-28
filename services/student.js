const sequelize =require("../config/database");
const borrowing = require('../models/borrowing');
const requestBorrowing = require('../models/requestBorrowing');
const temporyBorrowing = require('../models/temporyBorrowing');
const category = require('../models/category');
const model = require('../models/model');
const lab = require('../models/laboratory');
const equipment = require('../models/equipment');
const {Op} = require('sequelize');


class Student{
    constructor(){
        try{
            sequelize.authenticate();
            console.log('Database connected');
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
        //console.log(result1);
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
}

module.exports = Student;