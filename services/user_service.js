const sequelize=require('../config/database_config');


const UserModel =require('../models/user_model');
const {Op} = require("sequelize");

let userModel = new UserModel();
class UserService{
    
    constructor(){
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async createUser(email,password,type,isDelete){
        let cnt = await UserModel.count({where: {
            [Op.and]: [
                { email: email },
                { isDelete: false }
        ]}});

        if (cnt > 0) {
            return null;
        }else{                    
           const user =  await UserModel.create({           
              email: email,
                password:   password,
               type: type,
              isDelete: isDelete
            });
            console.log(user);
            
            return user;         
        }
    }

    async getUserByEmail(email){
        let cnt = await UserModel.count({where: {
            [Op.and]: [
                { email: email },
                { isDelete: false }
        ]}});

        if (cnt > 0) {
            return null;
        }else{                    
                    
            return "no user";         
        }
    }

    async getUser(email){
        
        console.log(email);
        const user = await UserModel.findOne({
            arrtibute:["id","type","password"],
            where:{[Op.and]:
                [{email:email,isDelete: 0 }]
                    
            },raw:true
        });
        if(user == null){
            throw new Error('Invalid email or password');
        }
        return user;
    }

    async deleteUser(uid){

    }

    async readUser(){
        
        console.log(email);
        const user = await TestModel.findOne({
            arrtibute:["id","type","password"],
            where:{[Op.and]:
                [{email:email,isDelete: 0 }]
                    
            },raw:true
        });

        // console.log(user);
        if(user == null){
            throw new Error('Invalid email or password');
        }
        return user;
    }

    async updateUserEmail(email){
        
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
    async updateUserPassword(email){
        
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

module.exports=UserService;