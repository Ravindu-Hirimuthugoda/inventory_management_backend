const sequelize = require("../config/database");

 const LaboratoryModel=require('../models/laboratory');
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
      
            where:{labName:labName,department: department },raw:true
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
            throw new Error('Laboratory Exsist');
        }
        console.log(laboratory);
        return laboratory;
    }

    
    async readLastEntry(){
        await LaboratoryModel.findAll({
            limit: 1,
            where: {
              //your where conditions, or without them if you need ANY entry
            },
            order: [ [ 'createdAt', 'DESC' ]]
          }).success(function(admin) { 

           return admin;
       
        }).error(function(err) {        
            throw new Error('Admin not updated');            
        });
    }

    async readAllLaboratory(){
        
        console.log("read laboratory");
        const laboratory = await LaboratoryModel.findAll();
        if(laboratory == null){
            throw new Error('Something went wrong!');
        }
        console.log(laboratory);
        return laboratory;
    
    }
   

}

module.exports=LaboratoryService;