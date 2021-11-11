
const sequelize = require("../../config/database");
const db = require('../../models/allmodels');
const { Op, $lt, } = require("sequelize");


class BorrowData {
    constructor() {
        try {
            sequelize.sequelize.authenticate();
        } catch (error) {

        }
    }

    async getBorrowData(id, fromDate, toDate) {

        const borrowdata = await db.BorrowData.findAll({
            subQuery: false,
            include: [{
                model: db.LectureBorrowing,
                include: [{
                    model: db.Lecture
                }]
            }, {
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
            where: {
                [Op.or]: [
                    {
                        [Op.and]: [
                            { EquipmentId: id },
                            { fromDate: { [Op.gte]: new Date(fromDate) } }, { fromDate: { [Op.lte]: new Date(toDate) } }
                        ]
                    }, { [Op.and]: [{ status: 'open' }, { EquipmentId: id }] }]

            }
        }).then().catch(error => {
            console.log(error);
        });

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
            }, {
                model: db.TemporyBorrowing,
                include: [{
                    model: db.Student
                }]
            }, {
                model: db.RequestBorrowing,
                include: [{
                    model: db.Student
                }]
            }
                , {
                model: db.Equipment,
                include: [{
                    model: db.Category,
                }, {
                    model: db.Model,
                }, {
                    model: db.Lab,
                }]
            }],
            where: { [Op.and]: [{ status: 'open' }, { EquipmentId: id }] }

        });

        return borrowdata;
    }
    async AddTemporyBorrow(userid, storeid, fromdate, todate, reason) {

        const t = await sequelize.transaction();
        try {
            // Then, we do some calls passing this transaction as an option:
            const available = await db.Equipment.findOne(
                {
                    where: { id: storeid }
                }

            );

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
                            equipmentId: storeid,
                            id: c + 1
                        }, { transaction: t }).then(async function (x) {

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
                    return null;
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
                                equipmentId: storeid,
                                id: c + 1
                            }, { transaction: t }).then(async function (x) {

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
                        return null;
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

            });

            await db.BorrowData.findOne({
                attributes: ['EquipmentId'],
                where: { id: id }
            }, { transaction: t }).then(async function (x) {

                if (status === "damage") {

                    const equipment = await db.Equipment.update({
                        status: status,
                        availability: 0,
                    },
                        {
                            where: { id: x.dataValues.EquipmentId }, transaction: t
                        });
                    const re = await db.DamageEquipment.count().then(async c => {
                        const eq = await db.DamageEquipment.create({
                            id: c + 1,
                            itemId: x.dataValues.EquipmentId,
                            openDate: new Date(),
                            reason: "Item has Damaged",
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
                    }, {
                        model: db.Model,
                    }, {
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
            console.log(borrowdata);
            while (f < t) {
                var dat = { date: `${f.getMonth() + 1}/${f.getDate()}`, data: [] }
                categories.forEach(e => {
                    dat.data.push({ cat: e.categoryName, data: 0 });
                });
                borrowdata.forEach(element => {
                    if (element != null) {


                        var bdate = new Date(element.dataValues.fromDate)
                        if (f.getDate() === bdate.getDate() && f.getMonth() === bdate.getMonth()) {
                            dat.data
                            dat.data.forEach((e, index) => {
                                if (e.cat === element.dataValues.Equipment.dataValues.Category.categoryName) {

                                    dat.data[index].data += 1;
                                }

                            });


                        }
                    }

                });


                list.push(dat);
                f.setDate(f.getDate() + 1);
            }

            return list;

        } catch (error) {
            console.log(error);
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
                    }, {
                        model: db.Model,
                    }, {
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








            while (f <= t) {
                var dat = { date: `${f.getMonth() + 1}/${f.getDate()}`, data: [] }
                await Promise.all(categories.map(async (e) => {
                    var count = await db.Equipment.count({ where: { [Op.and]: [{ categoryId: e.id }, { addDate: { [Op.lte]: f } }] } });

                    dat.data.push({ cat: e.categoryName, data: count });

                }));
                const compareObjects = (object1, object2, key) => {
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


                borrowdata.forEach(element => {

                    var fdate = new Date(element.dataValues.fromDate)
                    var ddate = new Date(element.dataValues.returnDate)

                    if (fdate < f && (f <= ddate || ddate < fdate)) {

                        dat.data.forEach((e, index) => {
                            if (e.cat === element.dataValues.Equipment.dataValues.Category.categoryName) {


                                if (dat.data[index].data > 0) {
                                    dat.data[index].data -= 1;
                                }
                            }

                        });


                    }


                });


                list.push(dat);
                f.setDate(f.getDate() + 1);
            }

            return list;

        } catch (error) {
            console.log(error);
        }


    }

    async AddnormalBorrow(userid, storeid, fromdate, todate, requestId) {

        const t = await sequelize.transaction();
        try {
            // Then, we do some calls passing this transaction as an option:
            const available = await db.Equipment.findOne(
                {
                    where: { id: storeid }
                }

            );
            let usertype;
            let type;
            let user = await db.Student.findOne(
                {
                    where: { id: userid }
                });
            if (user == null) {
                user = await db.Lecture.findOne(
                    {
                        where: { id: userid }
                    });
                usertype = "lecturer";
                type = "lecturer";
            }
            else {
                let req = await db.Request.findOne(
                    {
                        where: { id: requestId }
                    });
                type = req.dataValues.type;
                usertype = "student";
            }
            //const user = await db.User.findOne({ where: { id: userid } })


            if (true) {
                await db.BorrowData.count().then(async c => {
                    await db.BorrowData.create({
                        type: type,
                        status: 'open',
                        dueDate: todate,
                        fromDate: fromdate,
                        equipmentId: storeid,
                        id: c + 1
                    }, { transaction: t }).then(async function (x) {

                        if (type === "normal") {
                            const borrow = await db.RequestBorrowing.update({
                                borrowingId: x.id,
                            }, {
                                where: {
                                    [Op.and]: [{
                                        studentId: userid
                                    }, { borrowingId: null }, { requestId: requestId }]
                                }, transaction: t
                            })
                        }
                        else if (type === "lecturer") {

                            const borrow = await db.LectureBorrowing.update({
                                borrowingId: x.id,
                            }, {
                                where: {
                                    [Op.and]: [{

                                        lecturerId: userid

                                    }, { borrowingId: null }, { requestId: requestId }]
                                }, transaction: t
                            })
                        }
                        else {

                            const borrow = await db.TemporyBorrowing.update({
                                borrowingId: x.id,
                            }, {
                                where: {
                                    [Op.and]: [{

                                        studentId: userid

                                    }, { borrowingId: null }, { requestId: requestId }]
                                }, transaction: t
                            })
                        }
                        await db.Equipment.update({
                            availability: 0,

                        }, {
                            where: { id: storeid },
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