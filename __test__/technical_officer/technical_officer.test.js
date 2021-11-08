const request = require("supertest");
const app = require("../../index");
const sequelize = require("../../config/database");
const supertest = require("supertest");
const db = require('../../models/allmodels');
const { config } = require("dotenv");

describe('Inventory management system backend technical officer', () => {
    
    beforeEach(async() => {
        await supertest(app).post('/auth')
            .send({
                email: 'technical@uom.lk', password: 'abc123'
            });

    });
    let val = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsImV4cGlyZXNJbiI6MzYwMCwidHlwZSI6IlRlY2huaWNhbE9mZmljZXIiLCJpYXQiOjE2MzU2NjUyODh9.TZRih35x8Amt0RaczAjm5d6tdUBAzm8-Ns9hN5lHTzg";
    let storeid;
    let equipment;
    let borrowid;
    test('testing jest is ok',()=>{
        expect(1).toBe(1);
    });
    
     test('get labs',async()=>{
        await supertest(app).get('/technicalofficer/labs').set("Authorization",val).expect(200);
     });
    test('get categories',async()=>{
        await supertest(app).get('/technicalofficer/categories').set("Authorization",val).expect(200);
    });
     test('get models',async()=>{
        await supertest(app).get('/technicalofficer/models/1').set("Authorization",val).expect(200);
     });
     test('get categories items',async()=>{
        await supertest(app).get('/technicalofficer/categories/1').set("Authorization",val).expect(200);
     });
     test('get equipment by id',async()=>{
        await supertest(app).get('/technicalofficer/equipment/5-14-1-10').set("Authorization",val).expect(200);
     });
    
    test('get borrowdata',async()=>{
        await supertest(app).get('/technicalofficer/borrowdata/5-14-1-10').set("Authorization",val).expect(409);
    });
   
    test('get requestdata', async () => {
        
        await supertest(app).get('/technicalofficer/requestdata/55').set("Authorization",val).expect(200).then((response) => {

            expect(response.body).toBe("User Id Invaild");
            
        });
        
    });
     test('get requestdata valid', async () => {
        
         await supertest(app).get('/technicalofficer/requestdata/180244B').set("Authorization",val).expect(409);
        
    });

    test('get borrowdata', async () => {
        await supertest(app).post('/technicalofficer/borrowdata').set("Authorization",val).expect("Content-Type", /json/)
            .send({
                store_code: '5-14-1-10', fromDate: new Date('2021-09-01'), toDate: new Date()
            }).expect(200);
    });
    
    test('post addequipment', async () => {
        
        await supertest(app).post('/technicalofficer/addequipment').set("Authorization",val).expect("Content-Type", /json/)
            .send({
                category:5, model:14, lab:1,imgPreview:'https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/photoshop-image-size-command.png'
            }).expect(200).then(async(response) => {
                console.log(response.body)
                storeid = response.body.id;
                equipment = response.body;
                
                
        });
    });
    test('post updateequipment', async () => {
        
        await supertest(app).post('/technicalofficer/updateequipment').set("Authorization",val).expect("Content-Type", /json/)
            .send({
                store_code:storeid, status:'notdamage',imgPreview:equipment.imageURL,issetimage:false 
            }).expect(200).then(async(response) => {
        });
    });
    jest.setTimeout(20000)
    test('post temporyborrowing', async () => {
    
        
        await supertest(app).post('/technicalofficer/temporyborrowing').set("Authorization",val).expect("Content-Type", /json/)
            .send({
               userid:'180244B',storeid:storeid,fromdate:new Date(),todate:new Date(),reason:"nikan"
            }).expect(201).then(async(response) => {   
        });
    });
    test('get borrowdata',async()=>{
        await supertest(app).get(`/technicalofficer/borrowdata/${storeid}`).set("Authorization",val).expect(200).then((response) => {

            borrowid = response.body[0].id;
            console.log(response.body);
        });
    });

    test('post acceptequipment', async () => {
        await supertest(app).post('/technicalofficer/acceptEquipment').set("Authorization",val).expect("Content-Type", /json/)
            .send({
               id:borrowid, status:'notdamage'
            }).expect(201).then(async (response) => {
                let reqid = await db.TemporyBorrowing.findOne({
                     where: {
                        borrowingId: borrowid
                         
                    }
                })
                await db.TemporyBorrowing.destroy({
                    where: {
                        borrowingId:borrowid
                    }
                })
                await db.BorrowData.destroy({
                    where: {
                        id:borrowid
                    }
                })
                await db.Request.destroy({
                    where: {
                        id:reqid.requestId
                    }
                })
                
                await db.Equipment.destroy({
                    where: {
                        id:storeid
                    }
                })
                
        });
    });

    test('get report usage', async () => {
     
        
        await supertest(app).post('/technicalofficer/report').set("Authorization",val).expect("Content-Type", /json/)
            .send({
                fromdate: new Date('2021-10-01'), toDate: new Date('2021-10-03'), categories: [{id:1,categoryName:"projector"}],reportType:'usage'
            }).expect(200)
    });

    test('get report ', async () => {
    
     
        
        await supertest(app).post('/technicalofficer/report').set("Authorization",val).expect("Content-Type", /json/)
            .send({
                fromdate: new Date('2021-10-01'), toDate: new Date('2021-10-03'), categories: [{id:1,categoryName:"projector"}],reportType:'Availability'
            }).expect(200)
    });

   test('post addequipment', async () => {
        
        await supertest(app).post('/technicalofficer/addequipment').set("Authorization",val).expect("Content-Type", /json/)
            .send({
                category:5, model:14, lab:1,imgPreview:'https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/photoshop-image-size-command.png'
            }).expect(200).then(async(response) => {
                console.log(response.body)
                storeid = response.body.id;
                equipment = response.body;
                
                
        });
    }); 
    test('post updateequipment', async () => {
        
        await supertest(app).post('/technicalofficer/updateequipment').set("Authorization",val).expect("Content-Type", /json/)
            .send({
                store_code:storeid, status:'damage',imgPreview:equipment.imageURL,issetimage:false 
            }).expect(200).then(async (response) => {
                await db.DamageEquipment.destroy({
                    where: {
                        itemId:storeid
                    }
                })
                await db.Equipment.destroy({
                    where: {
                        id:storeid
                    }
                })
        });
    });

     test('post addequipment', async () => {
        
        await supertest(app).post('/technicalofficer/addequipment').set("Authorization",val).expect("Content-Type", /json/)
            .send({
                category:5, model:14, lab:1,imgPreview:'https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/photoshop-image-size-command.png'
            }).expect(200).then(async(response) => {
                console.log(response.body)
                storeid = response.body.id;
                equipment = response.body;
                
                
        });
     });
     jest.setTimeout(20000)
    test('post temporyborrowing', async () => {
    
        
        await supertest(app).post('/technicalofficer/temporyborrowing').set("Authorization",val).expect("Content-Type", /json/)
            .send({
               userid:'180244B',storeid:storeid,fromdate:new Date(),todate:new Date(),reason:"nikan"
            }).then(async(response) => {   
        });
    });
    test('get borrowdata',async()=>{
        await supertest(app).get(`/technicalofficer/borrowdata/${storeid}`).set("Authorization",val).expect(200).then((response) => {

            borrowid = response.body[0].id;
            console.log(response.body);
        });
    });

    test('post acceptequipment', async () => {
        await supertest(app).post('/technicalofficer/acceptEquipment').set("Authorization",val).expect("Content-Type", /json/)
            .send({
               id:borrowid, status:'damage'
            }).expect(201).then(async (response) => {
                let reqid = await db.TemporyBorrowing.findOne({
                     where: {
                        borrowingId: borrowid
                         
                    }
                })
                await db.TemporyBorrowing.destroy({
                    where: {
                        borrowingId:borrowid
                    }
                })
                await db.BorrowData.destroy({
                    where: {
                        id:borrowid
                    }
                })
                await db.Request.destroy({
                    where: {
                        id:reqid.requestId
                    }
                })
                await db.DamageEquipment.destroy({
                    where: {
                        itemId:storeid
                    }
                })
                await db.Equipment.destroy({
                    where: {
                        id:storeid
                    }
                })
                
        });
    });

     test('post addCategory', async () => {
    
        
        await supertest(app).post('/technicalofficer/addcategory').set("Authorization",val).expect("Content-Type", /json/)
            .send({
               category:'testcat'
            }).expect(201).then(async (response) => {
                 await db.Category.destroy({
                    where: {
                        categoryName:'testcat'
                    }
                })
        });
     });
    
     test('post addModel', async () => {
    
        
        await supertest(app).post('/technicalofficer/addmodel').set("Authorization",val).expect("Content-Type", /json/)
            .send({
               model:'testModel', category:1 
            }).expect(201).then(async (response) => {
                 await db.Model.destroy({
                    where: {
                        modelName:'testModel'
                    }
                })
        });
    });

});