const sequelize = require("../config/database");

const OfficeClerkModel=require('../models/office_clerk_model');
const {Op} = require("sequelize");

const ItemModel = require("../models/equipment");
const category = require('../models/category');
const model = require('../models/model');
const lab = require('../models/laboratory');


class OfficeClerkService{
    
    constructor(){
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async createOfficeClerk(index,firstName,lastName,uid){
        
        console.log("create officeClerk");
        const officeClerk = await OfficeClerkModel.create({
           id: index,
           firstName: firstName,
           lastName: lastName,
           userId: uid     
        });
        if(officeClerk == null){
            return null;
        }
        console.log(officeClerk);
        return officeClerk;
    }

    async getOfficeClerkByID(index){
        
        let cnt = await OfficeClerkModel.count({where: { id: index }});

        if (cnt > 0) {
            return null;
        }else{                                   
            return "no user";         
        }
    }

    async readLastEntry(){
        const officeClerks =  await OfficeClerkModel.findAll({
             limit: 1,
             order: [ [ 'createdAt', 'DESC' ]]
           });
           if(officeClerks == null){
             throw new Error('Something went wrong!');
         }
         console.log(officeClerks);
         return officeClerks;
     }

    async readAllOfficeClerk(){        
        console.log("read OfficeClerk");
        const officeClerks = await OfficeClerkModel.findAll({

        });
        if(officeClerks == null){
            throw new Error('Something went wrong!');
        }
        console.log(officeClerks);
        return officeClerks;
    
    }

    async updateOfficeClerk(firstName,lastName,department){
        await OfficeClerkModel.update(
            {
            where:{id:id },raw:true
            },
            {
                firstName: firstName,
                lastName: lastName,
                department:department
            }
        ).success(function(officeClerk) { 

           return officeClerk;
       
        }).error(function(err) {        
            throw new Error('OfficeClerk not updated');            
        });        
    }

    async readAllEquipment(){     
        category.hasMany(ItemModel);
        model.hasMany(ItemModel);
        lab.hasMany(ItemModel);
        ItemModel.belongsTo(category);
        ItemModel.belongsTo(model);
        ItemModel.belongsTo(lab);
        // let outs = [];   
        console.log("read equipment");
        // const officeClerks = await OfficeClerkModel.findAll({

        // });
        const item = await ItemModel.findAll({
            include: [
                { model: category, attributes: ['categoryName'] },
                { model: lab, attributes: ['labName'] },
                { model: model, attributes: ['modelName'] }
            ],            
            raw: true
        });
        if(item == null){
            throw new Error('Something went wrong!');
        }
        console.log(item);
        return item;
    
    }


}

module.exports=OfficeClerkService;