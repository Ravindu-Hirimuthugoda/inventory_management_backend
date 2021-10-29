const sequelize = require("../config/database");

// const UserModel =require('../models/testModel');
const AdminModel =require('../models/admin_model');
const {Op} = require("sequelize");

class AdminService{
    
    constructor(){
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async createAdmin(index,firstName,lastName,uid){
        console.log("create admin start");
        const admin = await AdminModel.create({
           id: index,
           firstName: firstName,
           lastName: lastName,
           userId: uid     
        });
        if(admin == null){
            throw new Error('Admin not created');
        }
        return admin;

    }

    async readLastEntry(){
        const admin =  await AdminModel.findAll({
             limit: 1,
             order: [ [ 'createdAt', 'DESC' ]]
           });
           if(admin == null){
             throw new Error('Something went wrong!');
         }
         console.log(admin);
         return admin;
    
    }

    // async updateAdmin(id,firstName,lastName){
    //    await AdminModel.update(
    //         {
    //         where:{id:id
                    
    //         },raw:true
    //         },
    //         {
    //             firstName: firstName,
    //             lastName: lastName
    //         }
    //     ).success(function(admin) { 

    //        return admin;
       
    //     }).error(function(err) {        
    //         throw new Error('Admin not updated');            
    //     });
    // }
    // async readAllAdmin(){
    //     console.log("get all admin start");
    //     const admin = await AdminModel.findAll({
    //     });
    //     if(admin == null){
    //         throw new Error('Admin not created');
    //     }
    //     return admin;
    // }

    // async readOneAdmin(id){
    //     console.log("get all admin start");
    //     const admin = await AdminModel.findOne();
    //     if(admin == null){
    //         throw new Error('Admin not created');
    //     }
    //     return admin;
    // }



    


}

module.exports=AdminService;