
const labModel = require("../../models/laboratory");
const userModel = require("../../models/user-model");
const studentModel = require("../../models/student_model");
const lectureModel = require("../../models/lecturer");
const officeClerkModel = require("../../models/office_clerk_model");
const technicalOfficerModel = require("../../models/technical_officer_model");

jest.mock('../../middleware/authorization.js', () => jest.fn((req, res, next) => next()));
// jest.mock('../../utils/check_user_type.js', ()=> jest.fn());


// import * as utils from "../../utils/check_user_type.js";
// import { checkUserType } from "../../utils/check_user_type.js";

// option 1: mocked value
// const mockGetData = jest.spyOn(checkUserType, "checkUserType").mockReturnValue(true);

const request = require('supertest');
// jest.useFakeTimers();

let server;


describe('Admin API ', () => {

    beforeAll(() => { 
        server = require('../../index'); 
    });

    describe('GET request /', () => {
        let url;
        const exec = async () => {
            console.log(url);
            return await request(server).get(url).set("Accept", "application/json");
        }
        test('Get last student', async () => {  
            url = "/users/admin/last-student";
            const res = await exec();
            expect(res.status).toBe(200);
        });

        test('Get last lecturer', async () => {  
            url = "/users/admin/last-lecture";
            const res = await exec();
            expect(res.status).toBe(200);
        });

        
        test('Get last technical officer', async () => {  
            url = "/users/admin/last-technicalofficer";
            const res = await exec();
            expect(res.status).toBe(200);
        });

        
        test('Get last office clerk', async () => {  
            url = "/users/admin/last-officeclerk";
            const res = await exec();
            expect(res.status).toBe(200);
        });

        
        test('Get all labs', async () => {  
            url = "/users/admin/get-all-labs";
            const res = await exec();
            expect(res.status).toBe(200);
        });

     
    });

    describe('POST /', () => {

        afterAll(async () => { 
            labModel.destroy({
                where:{
                    id:lab_id
                }
            });
            studentModel.destroy({
                where:{
                    id:"a"
                }
            });
            lectureModel.destroy({
                where:{
                    id:"b"
                }
            });
            userModel.destroy({ where: { id: [student_id,lecturer_id] }})
        });

       
        let student_id;
        let lecturer_id;
        let lab_id;
   
        let data;
        let url;

        const exec=async()=>{           
            return await request(server).post(url)
            .send(data)
            .set("Accept", "application/json");
        }

        test('should return 200 status code if lab added success', async () => {     
            url = '/users/admin/create-laboratory';
           data = {
                labName:"a",
                department:"a"  
            }     
            const res = await exec();
            lab_id = res.body["laboratory"]["id"]
            expect(res.status).toBe(200);
        });

        test('should return 406 status code if lab already added', async () => {     
            url = '/users/admin/create-laboratory';
            data = {
                labName: "IOT Lab",
                department:"CSE" 
            }    
            const res = await exec();
            // lab_info = res.body["laboratory"];            
            expect(res.status).toBe(406);
        });

        test('should return 200 status code if student added', async () => {     
            url = '/users/admin/create-student';
            data = {
                index : "a",
                email : "a",
                password : "a",
                firstName : "a",
                lastName : "a",
                department : "a",
            }    
            const res = await exec();
            console.log(res.body);
            student_id = res.body["user"]["id"];  
            console.log("aaaaaaaaaaaaaaaaaaaaaa"+ student_id);          
            expect(res.status).toBe(200);
        });

        test('should return 406 status code if student not added', async () => {     
            url = '/users/admin/create-student';
            data = {
                index : "S001",
                email : "ravindu@uom.com",
                password : "abc123",
                firstName : "ravindu",
                lastName : "perera",
                department : "CSE",
            }    
            const res = await exec();
            // console.log(res.body);
            // student_info = res.body["user"];            
            expect(res.status).toBe(406);
        });

        test('should return 200 status code if lecture added', async () => {     
            url = '/users/admin/create-lecture';
            data = {
                index : "b",
                email : "b",
                password : "b",
                firstName : "b",
                lastName : "b",
                department : "b",
            }    
            const res = await exec();
            console.log(res.body);
            lecturer_id = res.body["user"]["id"];  
            console.log(lecturer_id);          
            expect(res.status).toBe(200);
        });

        test('should return 406 status code if lecture not added', async () => {     
            url = '/users/admin/create-lecture';
            data = {
                index : "L001",
                email : "lecturer@uom.com",
                password : "abc123",
                firstName : "Test",
                lastName : "Lecturer",
                department : "CSE",
            }    
            const res = await exec();
            // console.log(res.body);
            // student_info = res.body["user"];            
            expect(res.status).toBe(406);
        });

       

      });
  
});
