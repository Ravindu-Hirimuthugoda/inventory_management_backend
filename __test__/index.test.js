const request = require("supertest");
const app = require("../index");
const sequelize = require("../config/database");



describe('Inventory management system backend',()=>{
    test('testing jest is ok',()=>{
        expect(1).toBe(1);
    });

    test('get checkAvailability',async()=>{
        await request(app).get('/checkAvaiability').expect(200);
    });
});