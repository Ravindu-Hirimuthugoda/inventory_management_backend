const app = require("../../index");
const sequelize = require("../../config/database");
const request = require("supertest");

describe('Inventory management system student backend',()=>{
    test('listening/student/chckavailability',async()=>{
        await request(app).get('/student/checkAvaiability').expect(200);
    });

    test('listening/student/ava',async()=>{
        await request(app).get('/student/ava').expect(200);
    });

    test('listening/student/category',async()=>{
        await request(app).get('/student/category').expect(200);
    });

    test('listening/student/borrow',async()=>{
        await request(app).get('/student/borrow').expect(200);
    });

    test('listening/student/model/camera',async()=>{
        await request(app).get('/student/model/camera').expect(200);
    });

    test('listening/student/lab/projector/CA124-B',async()=>{
        await request(app).get('/student/lab/projector/CA124-B').expect(200);
    });

    test('listening/student/storeCode/projector/CA124-B/cse%20level%201',async()=>{
        await request(app).get('/student/storeCode/projector/CA124-B/cse%20level%201').expect(200);
    });
    
    test('listening/student/lecturer/:labid',async()=>{
        await request(app).get('/student/lecturer/1').expect(200);
    });

    test('post normal request form data ',async()=>{
        await request(app).post('/student/sendNormalRequest').expect('Content-Type',/json/).expect(200);
    });

    test('post tempory request form data ',async()=>{
        await request(app).post('/student/sendTemporyRequest').expect('Content-Type',/json/).expect(200);
    });

    test('wrong route',async()=>{
        await request(app).get('/wrongRoute').expect(404);
    })
});