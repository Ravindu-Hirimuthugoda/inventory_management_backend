const sequelize=require('../config/database_config');

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
        console.log("create admin");
        const admin = await AdminModel.create({
           id: index,
           firstName: firstName,
           lastName: lastName,
           userId: uid     
        });
        if(admin == null){
            return null;
        }
        console.log(admin);
        return admin;

    }

    async readAdmin(){
        
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

    async updateAdmin(email){
        
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

module.exports=AdminService;