jest.mock('../../middleware/authorization.js', () => jest.fn((req, res, next) => next()));

let val = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsImV4cGlyZXNJbiI6MzYwMCwidHlwZSI6IlRlY2huaWNhbE9mZmljZXIiLCJpYXQiOjE2MzU2NjUyODh9.TZRih35x8Amt0RaczAjm5d6tdUBAzm8-Ns9hN5lHTzg";

const request = require('supertest');
// jest.useFakeTimers();

let server;


describe('Admin API ', () => {

    beforeAll(() => { 
        server = require('../../index'); 
    });
    afterAll(async () => { 
        // server.close();
    });
    
    describe('GET request /', () => {

        const exec = async () => {
            return await request(server).get('/users/office-clerk/get-under-repair-item');
        }
        

        it('should return users relates to the search', async () => {                    
            const res = await exec();
            expect(res.status).toBe(200);
        });

    });

    describe('POST /', () => {

        let lab_info;

        const exec=async()=>{
            lab_info = {
                labName:"SyscoLab40",
                department:"CSE"  
            };
            return await request(server).post('/users/admin/create-laboratory')
            .send(lab_info)
            .set("Accept", "application/json");
        }

        it('should return 200 status code if lab added success', async () => {           
            const res = await exec();
            console.log(res);    
            expect(res.status).toBe(200);
        });

      });
  
});
