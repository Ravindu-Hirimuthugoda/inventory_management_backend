const sequelize=require('../config/database_config');

const TechnicalOfficerModel=require('../models/technical_officer_model');
const {Op} = require("sequelize");

class TechnicalOfficerService{
    
    constructor(){
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    async createTechnicalOfficer(index,firstName,lastName,uid,labId){
               
        console.log("create technicalOfficer");
        const technicalOfficer = await TechnicalOfficerModel.create({
           id: index,
           firstName: firstName,
           lastName: lastName,
           laboratoryId: labId,
           userId: uid     
        });
        if(technicalOfficer == null){
            return null;
        }
        console.log(technicalOfficer);
        return technicalOfficer;
    }

    async readTechnicalOfficer(email){
        
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

    async readAllTechnicalOfficer(){
        
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

    async updateTechnicalOfficer(email){
        
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

module.exports=TechnicalOfficerService;