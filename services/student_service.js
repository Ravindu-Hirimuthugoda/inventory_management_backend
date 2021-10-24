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

    async getStudentByID(index){

        let cnt = await StudentModel.count({where: {
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
       const students =  await StudentModel.findAll({
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ]]
          });
          if(students == null){
            throw new Error('Something went wrong!');
        }
        console.log(students);
        return students;
    }

    async readAllStudent(){        
        console.log("read student");
        const students = await StudentModel.findAll({

        });
        if(students == null){
            throw new Error('Something went wrong!');
        }
        console.log(students);
        return students;
    
    }

    async updateStudent(firstName,lastName,department){
        await StudentModel.update(
            {
            where:{[Op.and]:
                [{id:id }]
                    
            },raw:true
            },
            {
                firstName: firstName,
                lastName: lastName,
                department:department
            }
        ).success(function(student) { 

           return student;
       
        }).error(function(err) {        
            throw new Error('student not updated');            
        });        
    }



}

module.exports=StudentService;