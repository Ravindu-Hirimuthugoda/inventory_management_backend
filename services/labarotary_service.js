const sequelize=require('../config/database_config');

 const LaboratoryModel=require('../models/laboratory_model');
const {Op} = require("sequelize");

class LaboratoryService{
    
    constructor(){
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async createLaboratory(labName,department){

        const tempLab = await LaboratoryModel.findOne({
            arrtibute:["id"],
            where:{[Op.and]:
                [{labName:labName,department: department }]
                    
            },raw:true
        });
        if(tempLab != null){
            return null;
        }
        console.log("create laboratory");
        const laboratory = await LaboratoryModel.create({
           labName: labName,
           department: department,

        });
        if(laboratory == null){
            return null;
        }
        console.log(laboratory);
        return laboratory;
    }

    async readLaboratory(email){
        
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

    async readAllLaboratory(){
        
        console.log("read laboratory");
        const laboratory = await LaboratoryModel.findAll({

        });
        if(laboratory == null){
            return null;
        }
        console.log(laboratory);
        return laboratory;
    
    }

    async updateLaboratory(email){
        
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

}

module.exports=LaboratoryService;