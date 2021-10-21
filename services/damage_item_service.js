const sequelize=require('../config/database_config');

const DamageItemModel=require('../models/damage_item_model');
const {Op} = require("sequelize");

const ItemModel = require("../models/item_model")

class DamageItemService{
    
    constructor(){
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    // async createDamageItem(index,firstName,lastName,uid){
        
      
    // }

    async readUnderRepairDamageItem(email){
        const damageItems = await DamageItemModel.findAll({
            subQuery: false,
            include: [{
                    model:ItemModel,
                }],
            where:{[Op.and]:[{itemStatus:"repair" }]},

        });
        if(damageItems == null){
            throw new Error('Something went wrong!');;
        }
        // console.log(damageItems);
        return damageItems;

    }

    async readOldDamageItem(email){
        const damageItems = await DamageItemModel.findAll({
            subQuery: false,
            include: [{
                    model:ItemModel,
                }],
            where:{[Op.and]:[{itemStatus:"finished" }]},

        });
        if(damageItems == null){
            throw new Error('Something went wrong!');;
        }
        // console.log(damageItems);
        return damageItems;

    }

    async readNewDamageItem(){
        const damageItems = await DamageItemModel.findAll({
            subQuery: false,
            include: [{
                    model:ItemModel,
                }],
            where:{[Op.and]:[{itemStatus:"pending" }]},

        });
        if(damageItems == null){
            throw new Error('Something went wrong!');;
        }
        // console.log(damageItems);
        return damageItems;
    }

    async markFinishedRepair(id,status){
        const damageItems = await DamageItemModel.update(
            {closeDate : sequelize.literal('CURRENT_TIMESTAMP'), itemStatus: status },
            {
            subQuery: false,
            include: [{
                    model:ItemModel,
                }],
            where:{[Op.and]:[{itemStatus:"repair" , id: id}]},

        });
        if(damageItems == null){
            throw new Error('Something went wrong!');;
        }
        return true;
 
    }

    async markAsSendToRepair(id,status){
        const damageItems = await DamageItemModel.update(
            {itemStatus: status },
            {
            subQuery: false,
            include: [{
                    model:ItemModel,
                }],
            where:{[Op.and]:[{itemStatus:"pending" , id: id}]},

        });
        if(damageItems == null){
            throw new Error('Something went wrong!');;
        }
        return true;
 
    }

    


}

module.exports=DamageItemService;