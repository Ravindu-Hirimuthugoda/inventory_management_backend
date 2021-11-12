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

