const sequelize=require('../config/database_config');

const StudentModel =require('../models/student_model');
const {Op} = require("sequelize");

class StudentService{
    
    constructor(){
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async createStudent(index,firstName,lastName,uid,department){
        
        console.log("create Student");
        const student = await StudentModel.create({
           id: index,
           firstName: firstName,
           lastName: lastName,
           department: department,
           userId: uid     
        });
        if(student == null){
            return null;
        }
        console.log(student);
        return student;
    }

    async readStudent(email){
        
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

    async readAllStudent(){
        
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

    async updateStudent(email){
        
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

module.exports=StudentService;