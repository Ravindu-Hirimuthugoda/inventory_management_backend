const request = require("supertest");
const app = require("../../index");
const sequelize = require("../../config/database");
const supertest = require("supertest");
const db = require('../../models/allmodels');
const { config } = require("dotenv");

describe('Inventory management system backend technical officer', () => {
    const request = supertest(app)
    let val = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJUMDAxIiwiZXhwaXJlc0luIjozNjAwLCJ0eXBlIjoiVGVjaG5pY2FsT2ZmaWNlciIsImZpcnN0TmFtZSI6IlB1YnVkdSIsImxhc3ROYW1lIjoiUHJhYmF0aGl5YSIsImVtYWlsIjoicHVidWR1QHVvbS5jb20iLCJpYXQiOjE2MzY1ODExMTR9.ILhZcSgPim_juHHhy0qcwopCw34vqRSTSUTKWrNIqDk";
    let storeid;
    let equipment;
    let borrowid;

    // db.Equipment.create = jest.fn().mockReturnValue(equipment);
    //  db.Equipment.findAll = jest.fn().mockReturnValue([equipment]);
    //  db.Equipment.findOne = jest.fn().mockReturnValue(equipment);
    beforeEach(async () => {
        await request.post('/auth')
            .send({
                email: 'pubudu@uom.com', password: 'abc123'
            });
        // equipment = { id: '1-1-1-1', imageURL: '', Lab: { labName: 'lab name' }, Model: { modelName: 'model name' }, Category: { categoryName: 'category name' }, availability: 1 };

    });


    test('get labs', async () => {
        await request.get('/technicalofficer/labs').set("Authorization", val).expect(200);
    });
    test('get categories', async () => {
        await request.get('/technicalofficer/categories').set("Authorization", val).expect(200);
    });
    test('get models', async () => {
        await request.get('/technicalofficer/models/1').set("Authorization", val).expect(200);
    });
    test('get categories items', async () => {
        await request.get('/technicalofficer/categories/1').set("Authorization", val).expect(200);
    });
    test('get equipment by id', async () => {
        await request.get('/technicalofficer/equipment/1-1-75-0').set("Authorization", val).expect(200);
    });

    test('get borrowdata', async () => {
        await request.get('/technicalofficer/borrowdata/1-1-75-0').set("Authorization", val).expect(200);
    });

    test('get requestdata', async () => {

        await request.get('/technicalofficer/requestdata/55').set("Authorization", val).expect(200).then((response) => {

            expect(response.body).toBe("User Id Invaild");

        });

    });
    test('get requestdata valid', async () => {

        await request.get('/technicalofficer/requestdata/S0001').set("Authorization", val).expect(200);

    });

    test('get borrowdata', async () => {
        await request.post('/technicalofficer/borrowdata').set("Authorization", val).expect("Content-Type", /json/)
            .send({
                store_code: '1-1-75-0', fromDate: new Date('2021-09-01'), toDate: new Date()
            }).expect(200);
    });

    test('post addequipment', async () => {

        await request.post('/technicalofficer/addequipment').set("Authorization", val).expect("Content-Type", /json/)
            .send({
                category: 1, model: 1, lab: 75, imgPreview: 'https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/photoshop-image-size-command.png'
            }).expect(200).then(async (response) => {
                console.log(response.body)
                storeid = response.body.id;
                equipment = response.body;


            });
    });
    test('post updateequipment', async () => {

        await request.post('/technicalofficer/updateequipment').set("Authorization", val).expect("Content-Type", /json/)
            .send({
                store_code: storeid, status: 'notdamage', imgPreview: equipment.imageURL, issetimage: false
            }).expect(200).then(async (response) => {
            });
    });
    jest.setTimeout(20000)
    test('post temporyborrowing', async () => {


        await request.post('/technicalofficer/temporyborrowing').set("Authorization", val).expect("Content-Type", /json/)
            .send({
                userid: 'S001', storeid: storeid, fromdate: new Date(), todate: new Date(), reason: "nikan"
            }).expect(201).then(async (response) => {
            });
    });
    test('get borrowdata', async () => {
        await request.get(`/technicalofficer/borrowdata/${storeid}`).set("Authorization", val).expect(200).then((response) => {

            borrowid = response.body[0].id;
            console.log(response.body);
        });
    });

    test('post acceptequipment', async () => {
        await request.post('/technicalofficer/acceptEquipment').set("Authorization", val).expect("Content-Type", /json/)
            .send({
                id: borrowid, status: 'notdamage'
            }).expect(201).then(async (response) => {
                let reqid = await db.TemporyBorrowing.findOne({
                    where: {
                        borrowingId: borrowid

                    }
                })
                await db.TemporyBorrowing.destroy({
                    where: {
                        borrowingId: borrowid
                    }
                })
                await db.BorrowData.destroy({
                    where: {
                        id: borrowid
                    }
                })
                await db.Request.destroy({
                    where: {
                        id: reqid.requestId
                    }
                })

                await db.Equipment.destroy({
                    where: {
                        id: storeid
                    }
                })

            });
    });

    test('get report usage', async () => {


        await request.post('/technicalofficer/report').set("Authorization", val).expect("Content-Type", /json/)
            .send({
                fromdate: new Date('2021-10-01'), toDate: new Date('2021-10-03'), categories: [{ id: 1, categoryName: "projector" }], reportType: 'usage'
            }).expect(200)
    });

    test('get report ', async () => {



        await request.post('/technicalofficer/report').set("Authorization", val).expect("Content-Type", /json/)
            .send({
                fromdate: new Date('2021-10-01'), toDate: new Date('2021-10-03'), categories: [{ id: 1, categoryName: "projector" }], reportType: 'Availability'
            }).expect(200)
    });

    test('post addequipment', async () => {

        await request.post('/technicalofficer/addequipment').set("Authorization", val).expect("Content-Type", /json/)
            .send({
                category: 1, model: 1, lab: 75, imgPreview: 'https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/photoshop-image-size-command.png'
            }).expect(200).then(async (response) => {
                console.log(response.body)
                storeid = response.body.id;
                equipment = response.body;


            });
    });
    test('post updateequipment', async () => {

        await request.post('/technicalofficer/updateequipment').set("Authorization", val).expect("Content-Type", /json/)
            .send({
                store_code: storeid, status: 'damage', imgPreview: equipment.imageURL, issetimage: false
            }).expect(200).then(async (response) => {
                await db.DamageEquipment.destroy({
                    where: {
                        itemId: storeid
                    }
                })
                await db.Equipment.destroy({
                    where: {
                        id: storeid
                    }
                })
            });
    });

    test('post addequipment', async () => {

        await request.post('/technicalofficer/addequipment').set("Authorization", val).expect("Content-Type", /json/)
            .send({
                category: 1, model: 1, lab: 75, imgPreview: 'https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/photoshop-image-size-command.png'
            }).expect(200).then(async (response) => {
                console.log(response.body)
                storeid = response.body.id;
                equipment = response.body;


            });
    });
    jest.setTimeout(20000)
    test('post temporyborrowing', async () => {


        await request.post('/technicalofficer/temporyborrowing').set("Authorization", val).expect("Content-Type", /json/)
            .send({
                userid: 'S001', storeid: storeid, fromdate: new Date(), todate: new Date(), reason: "nikan"
            }).then(async (response) => {
            });
    });
    test('get borrowdata', async () => {
        await request.get(`/technicalofficer/borrowdata/${storeid}`).set("Authorization", val).expect(200).then((response) => {

            borrowid = response.body[0].id;
            console.log(response.body);
        });
    });

    test('post acceptequipment', async () => {
        await request.post('/technicalofficer/acceptEquipment').set("Authorization", val).expect("Content-Type", /json/)
            .send({
                id: borrowid, status: 'damage'
            }).expect(201).then(async (response) => {
                let reqid = await db.TemporyBorrowing.findOne({
                    where: {
                        borrowingId: borrowid

                    }
                })
                await db.TemporyBorrowing.destroy({
                    where: {
                        borrowingId: borrowid
                    }
                })
                await db.BorrowData.destroy({
                    where: {
                        id: borrowid
                    }
                })
                await db.Request.destroy({
                    where: {
                        id: reqid.requestId
                    }
                })
                await db.DamageEquipment.destroy({
                    where: {
                        itemId: storeid
                    }
                })
                await db.Equipment.destroy({
                    where: {
                        id: storeid
                    }
                })

            });
    });

    test('post addCategory', async () => {


        await request.post('/technicalofficer/addcategory').set("Authorization", val).expect("Content-Type", /json/)
            .send({
                category: 'testcat'
            }).expect(201).then(async (response) => {
                await db.Category.destroy({
                    where: {
                        categoryName: 'testcat'
                    }
                })
            });
    });

    test('post addModel', async () => {


        await request.post('/technicalofficer/addmodel').set("Authorization", val).expect("Content-Type", /json/)
            .send({
                model: 'testModel', category: 1
            }).expect(201).then(async (response) => {
                await db.Model.destroy({
                    where: {
                        modelName: 'testModel'
                    }
                })
            });
    });

});