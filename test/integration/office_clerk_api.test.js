
const damageModel = require("../../models/damage_iteam");


jest.mock('../../middleware/authorization.js', () => jest.fn((req, res, next) => next()));


const request = require('supertest');


let server;


describe('Office Clerk API ', () => {

    beforeAll(() => {
        server = require('../../index');
    });

    describe('GET request /', () => {
        let url;
        const exec = async () => {
            console.log(url);
            return await request(server).get(url).set("Accept", "application/json");
        }
        test('Get new damage request', async () => {
            url = "/users/office-clerk/get-new-damage-item";
            const res = await exec();
            expect(res.status).toBe(200);
        });

        test('Get items under repair', async () => {
            url = "/users/office-clerk/get-under-repair-item";
            const res = await exec();
            expect(res.status).toBe(200);
        });


        test('Get repair history', async () => {
            url = "/users/office-clerk/get-old-damage-item";
            const res = await exec();
            expect(res.status).toBe(200);
        });

        test('Check availability', async () => {
            url = "/users/office-clerk/check-availability";
            const res = await exec();
            expect(res.status).toBe(200);
        });


    });

    describe('PUT /', () => {
        let mockDamageId;

        beforeAll(async () => {


            var tempModel = damageModel.create({
                id: 1111,
                itemId: "1-1-75-0",
                openDate: new Date(),
                reason: "Item has Damaged",
                status: "pending",
            })
            mockDamageId = 1111;

        });

        afterAll(async () => {
            damageModel.destroy({
                where: {
                    id: 1111
                }
            });
        });




        const exec = async () => {

            return await request(server).put(url)
                .set("Accept", "application/json");
        }

        test('should return 200 status code if lab added success', async () => {
            url = '/users/office-clerk/send-to-repair/' + mockDamageId;
            const res = await exec();

            expect(res.status).toBe(200);
        });





    });

});
