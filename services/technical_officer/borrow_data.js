
const sequelize = require("../../config/database");
const db = require('../../models/allmodels');
const { Op,$lt, } = require("sequelize");


class BorrowData{
    constructor() {
        try {
            sequelize.sequelize.authenticate();
        } catch (error) {
            
        }
    }

    async getBorrowData(id, fromDate, toDate) {
           console.log(id, fromDate, toDate,'hi');
            const borrowdata = await db.BorrowData.findAll({
            subQuery: false,
            include: [{
                model: db.LectureBorrowing,
                 include: [{
                model: db.Lecture
            }]
            },{
                model: db.TemporyBorrowing,
                 include: [{
                model: db.Student
            }]
                }, {
                    model: db.RequestBorrowing,
                    include: [{
                        model: db.Student
                    }]
                }],
            where: {[Op.or]:[
                {[Op.and]: [
                    { EquipmentId: id },
                    { fromDate: { [Op.gte]: new Date(fromDate) } },{ fromDate: { [Op.lte]: new Date(toDate) } }
                ]
                }, { [Op.and]: [{ status: 'open' },{ EquipmentId: id }] }]
                
            }
        }).then().catch(error => {
            console.log(error);
        });
         console.log(borrowdata);
        return borrowdata;
    }
    async GetlastBorrowData(id) {
            const borrowdata = await db.BorrowData.findAll({
            subQuery: false,
            include: [{
                model: db.LectureBorrowing,
                 include: [{
                model: db.Lecture
            }]
            },{
                model: db.TemporyBorrowing,
                 include: [{
                model: db.Student
            }]
                },{
                model: db.RequestBorrowing,
                 include: [{
                model: db.Student
            }]
            }
                , {
                model: db.Equipment,
                include: [{
                model: db.Category,
            },{
                model: db.Model,
            },{
                model: db.Lab,
            }]
            }],
                where: { [Op.and]: [{ status: 'open' }, { EquipmentId: id }] }
            
        });
         console.log(borrowdata);
        return borrowdata;
    }
    async AddTemporyBorrow(userid, storeid, fromdate, todate,reason) {
        console.log(userid, storeid, fromdate, todate);
        const t = await sequelize.transaction();
        try {
  // Then, we do some calls passing this transaction as an option:
            const available = await db.Equipment.findOne(
                {
                   where:{id: storeid }
               }
                
            );
            console.log(available.dataValues.availability);
            if (available.dataValues.availability) {
                const user = await db.Student.findOne(
                    {
                        where: { id: userid }
                    });
                if (user != null) {
                    const req = await db.Request.count()

                    await db.Request.create({
                        id: req + 1,
                        status: 'pass',
                        reason: reason,
                        requestDate: fromdate,
                        returnDate: todate,
                        equipmentId: storeid,
                        type: 'tempory',
                    }, { transaction: t });
                
                    await db.BorrowData.count().then(async c => {
                        await db.BorrowData.create({
                            type: 'temporary',
                            status: 'open',
                            dueDate: todate,
                            fromDate: fromdate,
                            EquipmentId: storeid,
                            id: c + 1
                        }, { transaction: t }).then(async function (x) {
                            console.log(x.id);
                            await db.TemporyBorrowing.count().then(async cou => {
                                await db.TemporyBorrowing.create(
                                    {
                                        id: cou + 2,
                                        studentId: userid,
                                        requestId: req + 1,
                                        borrowingId: x.id
                                    }, { transaction: t }
                                )
                            }).then(async function (x) {
                                await db.Equipment.update({
                                    availability: 0,
                                },
                                    {
                                        where: {
                                            id: storeid
                                        },
                                        transaction: t
                                    });
                            });
                        });
                    });
                
                    // If the execution reaches this line, no errors were thrown.
                    // We commit the transaction.
                    await t.commit();
                }
                else {
                    const lec = await db.Lecture.findOne(
                    {
                        where: { id: userid }
                        });
                    if (lec != null) {
                         const req = await db.Request.count()

                    await db.Request.create({
                        id: req + 1,
                        status: 'pass',
                        reason: reason,
                        requestDate: fromdate,
                        returnDate: todate,
                        equipmentId: storeid,
                        type: 'tempory',
                    }, { transaction: t });
                
                    await db.BorrowData.count().then(async c => {
                        await db.BorrowData.create({
                            type: 'temporary',
                            status: 'open',
                            dueDate: todate,
                            fromDate: fromdate,
                            EquipmentId: storeid,
                            id: c + 1
                        }, { transaction: t }).then(async function (x) {
                            console.log(x.id);
                            await db.LectureBorrowing.count().then(async cou => {
                                await db.LectureBorrowing.create(
                                    {
                                        id: cou + 1,
                                        lecturerId: userid,
                                        requestId: req + 1,
                                        borrowingId: x.id
                                    }, { transaction: t }
                                )
                            }).then(async function (x) {
                                await db.Equipment.update({
                                    availability: 0,
                                },
                                    {
                                        where: {
                                            id: storeid
                                        },
                                        transaction: t
                                    });
                            });
                        });
                    });
                
                    // If the execution reaches this line, no errors were thrown.
                    // We commit the transaction.
                    await t.commit();
                    }
                    else {
                        return 'User id is invalid';
                    }
                }
            }
            else {
                return 'Equipment is Unavailable';
            }
        } catch (error) {
  // If the execution reaches this line, an error was thrown.
  // We rollback the transaction.
            console.log(error);
            await t.rollback();
            return '';

        }
         console.log("error");
    }
    async acceptEquipment(id, status) {
        const t = await sequelize.transaction();
        try {
            await db.BorrowData.update({
                status: 'close',
                returnDate: new Date()
            }, {
                where: { id: id },
                transaction: t
            }).then(async function (x) {
                console.log(x);
            });

            await db.BorrowData.findOne({
                attributes: ['EquipmentId'],
                 where: { id: id }
            }, { transaction: t }).then(async function (x) {
                console.log(x);
                if (status === "damage") {
                  
                        const equipment = await db.Equipment.update({
                            status: status,
                            availability: 0,
                        },
                            { where: { id: x.dataValues.EquipmentId}, transaction: t
                            });
                        const re = await db.DamageEquipment.count().then(async c => {
                            const eq = await db.DamageEquipment.create({
                                id: c + 1,
                                itemId: x.dataValues.EquipmentId,
                                openDate: new Date(),
                                reason: "Accept item",
                                status: "pending",
                            }, { transaction: t })
                        })
                       
                    
                }
                else {
                    await db.Equipment.update({
                        availability: 1,
                        status: status
                    }, {
                        where: { id: x.dataValues.EquipmentId },
                        transaction: t
                    })
                }
            });
            await t.commit();
        } catch (error) {
             console.log(error);
            await t.rollback();
           
        }
    }

    async getReport(fromdate, toDate, categories) {
        try {

            const borrowdata = await db.BorrowData.findAll({
                subQuery: false,
                include: [{
                model: db.Equipment,
                include: [{
                model: db.Category,
            },{
                model: db.Model,
            },{
                model: db.Lab,
            }]
            }]
                ,
                where: {
                    [Op.and]: [{ fromDate: { [Op.gte]: new Date(fromdate) } }, { fromDate: { [Op.lte]: new Date(toDate) } }]
                },
                order: [
                    ['fromdate', 'ASC']],
                
            });
            var list = [];
            var f = new Date(fromdate);
            var t = new Date(toDate);

            while (f < t) {
                var dat = { date: `${f.getMonth()+1}/${f.getDate()}`, data: [] }
                categories.forEach(e => {
                    dat.data.push({cat:e.categoryName,data:0});
                });
                borrowdata.forEach(element => {
                   
                    var bdate=new Date(element.dataValues.fromDate)
                    if (f.getDate() === bdate.getDate() && f.getMonth() === bdate.getMonth()) {
                        dat.data
                        dat.data.forEach((e,index) => {
                            if (e.cat === element.dataValues.Equipment.dataValues.Category.categoryName) {
                               
                                dat.data[index].data += 1;
                            }
                            
                        });
                        
                         
                    }
                    
                    
                });
                

                list.push(dat);
                f.setDate(f.getDate() + 1);
            }
            console.log(list);
            return list;
            
        } catch (error) {
            
        }
           
 
    }
    async getAvailableReport(fromdate, toDate, categories) {
        try {

            const borrowdata = await db.BorrowData.findAll({
                subQuery: false,
                include: [{
                model: db.Equipment,
                include: [{
                model: db.Category,
            },{
                model: db.Model,
            },{
                model: db.Lab,
            }]
            }]
                ,
                where: {
                    [Op.and]: [{ fromDate: { [Op.gte]: new Date(fromdate) } }, { fromDate: { [Op.lte]: new Date(toDate) } }]
                },
                order: [
                    ['fromdate', 'ASC']],
                
            });
            var list = [];
            var f = new Date(fromdate);
            var t = new Date(toDate);
            var data = []
    

            
           
            
           console.log(data, 'data');


            while (f <= t) {
                var dat = { date: `${f.getMonth()+1}/${f.getDate()}`, data: [] }
                await Promise.all( categories.map(async (e)=> {
                    var count = await db.Equipment.count({ where: { [Op.and]:[{ categoryId: e.id },{addDate: { [Op.lte]: f } }] }});
                    
                    dat.data.push({ cat: e.categoryName, data: count });
                    
                }));
                const compareObjects=(object1, object2, key) =>{
                    const obj1 = object1[key].toUpperCase()
                    
                    const obj2 = object2[key].toUpperCase()
                    if (obj1 < obj2) {
                        return -1
                    }
                    if (obj1 > obj2) {
                        return 1
                    }
                    return 0  
                }
                

                dat.data.sort((d1, d2) => {
                    return compareObjects(d1, d2, 'cat')
                })
                
                 console.log(dat);
                borrowdata.forEach(element => {
                   
                    var fdate = new Date(element.dataValues.fromDate)
                    var ddate = new Date(element.dataValues.returnDate)
                    console.log(f,fdate,ddate,fdate<f && (f<=ddate ||ddate<fdate));
                    if (fdate<f && (f<=ddate ||ddate<fdate)) {
                        
                        dat.data.forEach((e,index) => {
                            if (e.cat === element.dataValues.Equipment.dataValues.Category.categoryName) {
                                
                                dat.data[index].data -= 1;
                            }
                            
                        });
                        
                         
                    }
                    
                    
                });
                

                list.push(dat);
                f.setDate(f.getDate() + 1);
            }
            console.log(list);
            return list;
            
        } catch (error) {
            console.log(error);
        }
           
 
    }

    async AddnormalBorrow(userid, storeid, fromdate, todate,requestId) {
        console.log(userid, storeid, fromdate, todate);
        const t = await sequelize.transaction();
        try {
  // Then, we do some calls passing this transaction as an option:
            const available = await db.Equipment.findOne(
                {
                   where:{id: storeid }
               }
                
            );
            const user = await db.User.findOne({ where: { id: userid } })
            const usertype = user.dataValues.type;
            console.log(available.dataValues.availability);
            if (true) {
                await db.BorrowData.count().then(async c => {
                    await db.BorrowData.create({
                        type: usertype=="student"?'normal':'lecturer',
                        status: 'open',
                        dueDate: todate,
                        fromDate: fromdate,
                        EquipmentId: storeid,
                        id: c + 1
                    }, { transaction: t }).then(async function (x) {
                        console.log(x.id);
                        if (usertype === "student") {
                            const borrow = await db.RequestBorrowing.update({
                                borrowingId: x.id,  
                            },{
                                where: {
                                    [Op.and]: [{
                                        studentId: userid
                                    }, { borrowingId: null }]},transaction: t
                            })
                        }
                        else {
                            
                            const borrow = await db.LectureBorrowing.update({
                                borrowingId: x.id,  
                            },{
                                where: {
                                    [Op.and]: [{
                    
                                        lecturerId: userid
                                        
                                    }, { borrowingId: null }]},transaction: t
                            })
                        }
                        await db.Equipment.update({
                            availability: 0,
                            
                        },{ where: {id: storeid },
                            transaction: t
                        });
                        
                        // await db.BorrowData.count().then(async cou => {
                        //     await db.RequestBorrowing.create(
                        //         {
                        //             id: cou + 1,
                        //             requestId: requestId,
                        //             borrowingId: x.id
                        //         }, { transaction: t }
                        //     )
                        // }).then(async function (x){
                            
                        // });
                    });
                });
                
                // If the execution reaches this line, no errors were thrown.
                // We commit the transaction.
                await t.commit();
            }
            else {
                return 'Equipment is Unavailable';
            }
        } catch (error) {
  // If the execution reaches this line, an error was thrown.
  // We rollback the transaction.
            console.log(error);
            await t.rollback();
            return '';

        }
        
    }
}

module.exports = BorrowData;