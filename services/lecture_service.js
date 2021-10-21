const sequelize=require('../config/database_config');

const LectureModel=require('../models/lecture_model');
const {Op} = require("sequelize");

class LecturerService{
    
    constructor(){
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async createLecturer(index,firstName,lastName,uid,department){
        
          
        console.log("create lecture");
        const lecture = await LectureModel.create({
           id: index,
           firstName: firstName,
           lastName: lastName,
           department: department,
           userId: uid     
        });
        if(lecture == null){
            return null;
        }
        console.log(lecture);
        return lecture;
    }
    async readLastEntry(){
        const lecturers =  await LectureModel.findAll({
             limit: 1,
             order: [ [ 'createdAt', 'DESC' ]]
           });
           if(lecturers == null){
             throw new Error('Something went wrong!');
         }
         console.log(lecturers);
         return lecturers;
     }

    async readAllLecture(){        
        console.log("read Lecture");
        const lecture = await LectureModel.findAll({

        });
        if(lecture == null){
            throw new Error('Something went wrong!');
        }
        console.log(lecture);
        return lecture;
    
    }

    async updateLecture(firstName,lastName,department){
        await LectureModel.update(
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
        ).success(function(lecture) { 

           return lecture;
       
        }).error(function(err) {        
            throw new Error('lecture not updated');            
        });        
    }


}
module.exports=LecturerService;