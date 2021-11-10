const adminModel = require("../../models/admin_model");
const userModel = require("../../models/user-model");
const studentModel = require("../../models/student_model");
const lectureModel = require("../../models/lecturer");
const officeClerkModel = require("../../models/office_clerk_model");
const technicalOfficerModel = require("../../models/technical_officer_model");
const itemModel = require("../../models/equipment");

const TechnicalService = require("../../services/technical_officer_service");
const StudentService = require("../../services/student");
const LectureService = require("../../services/lecturer");
const OfficeClerkService = require("../../services/office_clerk_service");

const sequelize = require("../../config/database");




describe('Read all items  ', () => {

    let obj;

    
    const exec = async () => {
        itemModel.findAll = jest.fn().mockReturnValue([obj]);
        const officeClerkService = new OfficeClerkService();
        return await officeClerkService.readAllEquipment();
    }

    beforeEach(() => {
        sequelize.authenticate = jest.fn();
        obj={
            first_name: 'Lahiru',
            last_name: 'Madhushan',
            email: 'cha@gmail.com',
            profile_pic: ''
          },
          {
            first_name: 'Oshani',
            last_name: 'Weerasinghe',
            email: 'lasath@gmail.com',
            profile_pic: ''
          };

    });

    test('should item  model list if item exist', async () => {
        const result = await exec();
        expect(result).toContainEqual(obj);
    });
});


// describe('create lecturer ', () => {

//     let lecturer;
//     let index,firstName,lastName,uid,department;
    
//     const exec = async () => {
//         lectureModel.create = jest.fn().mockReturnValue(lecturer);
//         const lecturerService = new LectureService();
//         return await lecturerService.createLecturer(index,firstName,lastName,uid,department);
//     }

//     beforeEach(() => {
//         sequelize.authenticate = jest.fn();
//         lecturer = {
//             index: "L001",
//             firstName: "Test",
//             lastName: "Lecturer",
//             department : "CSE",         
//             uid: 1,
            
//         };

//     });

//     test('should lecturer model if create lecturer', async () => {
//         index = "L001";        
//         firstName= "Test",
//         lastName= "Lecturer",            
//         uid= 1;
//         department = "CSE";
//         const result = await exec();
//         expect(result).toBe(lecturer);
//     });
// });

// describe('create officeClerk', () => {

//     let officeClerk;
//     let index,firstName,lastName,uid;
    
//     const exec = async () => {
//         officeClerkModel.create = jest.fn().mockReturnValue(officeClerk);
//         const officeClerkService = new OfficeClerkService();
//         return await officeClerkService.createOfficeClerk(index,firstName,lastName,uid);
//     }

//     beforeEach(() => {
//         sequelize.authenticate = jest.fn();
//         officeClerk = {
//             index: "C001",
//             firstName: "Test",
//             lastName: "Office Clerk",            
//             uid: 1
//         };

//     });

//     test('should office clerk model if create office clerk', async () => {
//         index = "C001";        
//         firstName= "Test",
//         lastName= "Office Clerk",            
//         uid= 1;
//         const result = await exec();
//         expect(result).toBe(officeClerk);
//     });
// });

// describe('create technicalOfficer', () => {

//     let technicalOfficer;
//     let index,firstName,lastName,uid,labId;
    
//     const exec = async () => {
//         technicalOfficerModel.create = jest.fn().mockReturnValue(technicalOfficer);
//         const technicalOfficerService = new TechnicalService();
//         return await technicalOfficerService.createTechnicalOfficer(index,firstName,lastName,uid,labId);
//     }

//     beforeEach(() => {
//         sequelize.authenticate = jest.fn();
//         technicalOfficer = {
//             index: "T001",
//             firstName: "Test",
//             lastName: "Office Clerk",            
//             uid: 1,
//             labId:1
//         };

//     });

//     test('should technical officer model if create technical officer', async () => {
//         index = "T001";        
//         firstName= "Test",
//         lastName= "Technical Officer",            
//         uid= 1;
//         labId = 1;
//         const result = await exec();
//         expect(result).toBe(technicalOfficer);
//     });
// });


// describe('get last student ', () => {

//     let student;
    
    
//     const exec = async () => {
//         studentModel.findAll = jest.fn().mockReturnValue(student);
//         const studentService = new StudentService();
//         return await studentService.readLastEntry();
//     }

//     beforeEach(() => {
//         sequelize.authenticate = jest.fn();
        

//     });

//     test('should student model if student exsist', async () => {
//         student = {
//             index: "S001",
//             firstName: "Test",
//             lastName: "Student",
//             department : "CSE",         
//             uid: 1,            
//         };
//         const result = await exec();
//         expect(result).toBe(student);
//     });

// });

