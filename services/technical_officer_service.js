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

    async getTechnicalOfficerByID(index){
               
        let cnt = await TechnicalOfficerModel.count({where: {
            [Op.and]: [
                { id: index },             
        ]}});

        if (cnt > 0) {
            return null;
        }else{                    
                    
            return "no user";         
        }
    }

    async readLastEntry(){
        const technicalOfficers =  await TechnicalOfficerModel.findAll({
             limit: 1,
             order: [ [ 'createdAt', 'DESC' ]]
           });
           if(technicalOfficers == null){
             throw new Error('Something went wrong!');
         }
         console.log(technicalOfficers);
         return technicalOfficers;
     }

    async readAllTechnicalOfficer(){        
        console.log("read technicalOfficer");
        const technicalOfficers = await TechnicalOfficerModel.findAll({

        });
        if(technicalOfficers == null){
            throw new Error('Something went wrong!');
        }
        console.log(technicalOfficers);
        return technicalOfficers;
    
    }

    async updateTechnicalOfficer(firstName,lastName,labId){
        await TechnicalOfficerModel.update(
            {
            where:{[Op.and]:
                [{id:id }]
                    
            },raw:true
            },
            {
                firstName: firstName,
                lastName: lastName,
                laboratoryId:labId
            }
        ).success(function(technicalOfficer) { 

           return technicalOfficer;
       
        }).error(function(err) {        
            throw new Error('technicalOfficer not updated');            
        });        
    }


}

module.exports=TechnicalOfficerService;