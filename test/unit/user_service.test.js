// import jest from "jest"
const userModel = require("../../models/user-model");
const studentModel = require("../../models/student_model");
const lectureModel = require("../../models/lecturer");
const officeClerkModel = require("../../models/office_clerk_model");
const technicalOfficerModel = require("../../models/technical_officer_model");
const User = require("../../services/user");
const sequelize = require("../../config/database");


describe('getAllUsers', () => {

    let users, obj;
    const exec = async () => {
        userModel.findAll = jest.fn().mockReturnValue([obj]);
        const user1 = new User();
        return await user1.getAllUsers();
    }

    beforeEach(() => {
        sequelize.authenticate = jest.fn();
        obj = {
            email: 'admin@uom.com',
            type: "Admin",
        },
        {
            email: 'student@uom.com',
            type: "Student",
        },
        {
            email: 'officeclerk@uom.com',
            type: "OfficeClerk",
        },
        {
            email: 'lecturer@uom.com',
            type: "Lecturer",
        };

    });

    test('should return an array containing all user objects', async () => {
        const result = await exec();
        console.log(result);
        // expect(2).toEqual(2);
        expect(result).toContainEqual(obj);
    });
});

describe('Get user by email', () => {

    let email;

    const exec = async () => {
        if (email == "admin@uom.com") {
            userModel.count = jest.fn().mockReturnValue(1);
        } else {
            userModel.count = jest.fn().mockReturnValue(null);
        }
        const user1 = new User();
        return await user1.getUserByEmail(email);
    }

    beforeEach(() => {
        sequelize.authenticate = jest.fn();
    });

    it('should no user if user not already exist', async () => {
        email = "admin123@uom.com";
        const result = await exec();

        expect(result).toBe("no user");
    });

    it('should null if user already exist', async () => {
        email = "admin@uom.com";
        const result = await exec();

        expect(result).toBe(null);
    });
});

describe('Get user', () => {

    let email;
    let user;
    const exec = async () => {

        userModel.findOne = jest.fn().mockReturnValue(user);
        const user1 = new User();
        return await user1.getUser(email);
    }

    beforeEach(() => {
        sequelize.authenticate = jest.fn();
        user = {
            id: 1,
            type: "Admin",
            password: "$2b$10$0qeGaperitSIb.BJF2uVSeLcPoWlNedjTM517Yz6gG/Zv1ZHvOtz2"
        };
        email = "admin@uom.com"
    });

    it('should user object if user exist', async () => {
        email = "admin123@uom.com";
        const result = await exec();

        expect(result).toBe(user);
    });

    it('should null if user  not already exist', async () => {
        email = "admin123@uom.com";
        user = null
        const result = await exec();

        expect(result).toBe(null);
    });
});

describe('create user', () => {


    let email;
    let password;
    let type;
    let isDelete;

    let count;
    let user;
    const exec = async () => {
        userModel.count = jest.fn().mockReturnValue(count);
        userModel.create = jest.fn().mockReturnValue(user);
        const user1 = new User();
        return await user1.createUser(email, password, type, isDelete);
    }

    beforeEach(() => {
        sequelize.authenticate = jest.fn();
        user = {
            id: 1,
            type: "Admin",
            email: "admin@uom.com",            
            password: "$2b$10$0qeGaperitSIb.BJF2uVSeLcPoWlNedjTM517Yz6gG/Zv1ZHvOtz2"
        };
        count = 0;
    });

    it('should user object if user added', async () => {
        email = "admin@uom.com";
        password = "$2b$10$0qeGaperitSIb.BJF2uVSeLcPoWlNedjTM517Yz6gG/Zv1ZHvOtz2";
        type = "Admin";
        
        const result = await exec();

        expect(result).toBe(user);
    });

    it('should null if user  not added', async () => {
        email = "admin@uom.com";
        password = "$2b$10$0qeGaperitSIb.BJF2uVSeLcPoWlNedjTM517Yz6gG/Zv1ZHvOtz2";
        type = "Admin";
        
        count = 1;
        user = null
        const result = await exec();

        expect(result).toBe(null);
    });
});

describe('Read user role', () => {

    let type;
    let userId;

    let mockRole;

    const exec = async () => {
       
        studentModel.findOne = jest.fn().mockReturnValue({...mockRole, type: type});
        lectureModel.findOne = jest.fn().mockReturnValue({...mockRole, type: type});
        technicalOfficerModel.findOne = jest.fn().mockReturnValue({...mockRole, type: type});
        officeClerkModel.findOne = jest.fn().mockReturnValue({...mockRole, type: type});
        const user1 = new User();
        return await user1.readUserRole(userId,type);
    }

    beforeEach(() => {
        sequelize.authenticate = jest.fn();
       
        mockRole = {
            id: 1,
            firstName: "Temp",
            lastName: "Role",                 
        };
    
    });

    it('should student model for given id is student', async () => {
        userId = 1;       
        type = "Student";        
        const result = await exec();

        expect(result["type"]).toBe(type);
    });
    it('should Lecturer model for given id is Lecturer', async () => {
        userId = 2;       
        type = "Lecturer";        
        const result = await exec();

        expect(result["type"]).toBe(type);
    });
    it('should OfficeClerk model for given id is OfficeClerk', async () => {
        userId = 3;       
        type = "OfficeClerk";        
        const result = await exec();

        expect(result["type"]).toBe(type);
    });

    it('should null for given id has no type', async () => {
        userId = 3;       
        type = "";        
        const result = await exec();

        expect(result).toBe(null);
    });

  
});