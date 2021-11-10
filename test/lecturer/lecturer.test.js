const app = require("../../index");
const sequelize = require("../../config/database");
const request = require("supertest");

describe('test lecturer API',()=>{
    test('listen lecturer pending requests',async()=>{
        await request(app).get('/lecturer/pending').expect(200);
    });

    test('listen lecturer/requestDetail/:id ',async()=>{
        await request(app).get('/lecturer/requestDetail/1').expect(200);
    });

    test('post normal request form data ',async()=>{
        await request(app).post('/lecturer/sendNormalRequest').expect('Content-Type',/json/).expect(200);
    });

    test('post tempory request form data ',async()=>{
        await request(app).post('/lecturer/sendTemporyRequest').expect('Content-Type',/json/).expect(200);
    });
    
    test('post approve request',async()=>{
        await request(app).post('/lecturer/approve/1').expect('Content-Type',/json/).expect(200);
    });

})