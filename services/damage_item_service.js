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

    async createDamageItem(index,firstName,lastName,uid){
        
      
    }

    async readDamageItem(email){
        
        // console.log(email);
        // const user = await TestModel.findOne({
        //     arrtibute:["id","type","password"],
        //     where:{[Op.and]:
        //         [{email:email,isDelete: 0 }]
                    
        //     },raw:true
        // });

        // // console.log(user);
        // if(user == null){
        //     throw new Error('Invalid email or password');
        // }
        // return user;
    }

    async readNewDamageItem(){
        
        // console.log("read damage");
        // const damages = await DamageItemModel.findAll({
        //     where:{[Op.and]:
        //         [{status:"pending" }]
                    
        //     },raw:true
        // });
        // console.log(damages);
        // console.log("damages");
        
        // if(damages == null){
        //     return false;
        // }
        
        // return damages;
        console.log("read laboratory");
        const laboratory = await DamageItemModel.findAll({
            subQuery: false,
            include: [{
                    model:ItemModel,
                }],
            // where:{[Op.and]:[{status:"pending" }]},

        });
        if(laboratory == null){
            return null;
        }
        console.log(laboratory);
        return laboratory;
    }

    async updateDamageItem(id,status,isClose){
        let damageItem;
        if(isClose){
            damageItem = await DamageItemModel.update({     
                subQuery: false,
                include: [{
                    model:ItemModel,
                }], 
                where:{[Op.and]:
                    [{id:id,}]                        
                },raw:true
            });

        }else{
            damageItem = await DamageItemModel.update({
                where:{[Op.and]:
                    [{id:id }]
                        
                },raw:true
            });

        }
        
        console.log(email);
      

        // console.log(user);
        if(damageItem == null){
            throw new Error('Invalid Damage Item');
        }
        return damageItem;
    }


}

module.exports=DamageItemService;