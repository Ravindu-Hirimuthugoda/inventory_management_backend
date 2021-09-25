const db = require('../../config/database')
const { Op,$lt, } = require("sequelize");


class BorrowData{
    constructor() {
        try {
            db.sequelize.authenticate();
           
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
        const t = await db.sequelize.transaction();
        try {
  // Then, we do some calls passing this transaction as an option:
            const available = await db.Equipment.findOne(
                {
                   where:{id: storeid }
               }
                
            );
            console.log(available.dataValues.availability);
            if (available.dataValues.availability) {
                await db.BorrowData.count().then(async c => {
                    await db.BorrowData.create({
                        type: 'temporary',
                        status: 'open',
                        dueDate: todate,
                        fromdate: fromdate,
                        EquipmentId: storeid,
                        id: c + 1
                    }, { transaction: t }).then(async function (x) {
                        console.log(x.id);
                        await db.BorrowData.count().then(async cou => {
                            await db.TemporyBorrowing.create(
                                {
                                    id: cou + 1,
                                    studentId: userid,
                                    reason: reason,
                                    borrowingId: x.id
                                }, { transaction: t }
                            )
                        });
                    });
                });
                await db.Equipment.update({
                    availability: 0,
                },
                    {
                        where: {
                            id: storeid
                        },
                        transaction: t
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
    async acceptEquipment(id, status) {
        const t = await db.sequelize.transaction();
        try {
            await db.BorrowData.update({
                status: 'close',
                returnDate: new Date()
            }, {
                where: { id: id },
                transaction: t
            });
            await db.BorrowData.findOne({
                attributes: ['EquipmentId'],
                
            }, { where: { id: id }, transaction: t }).then(async function (x) {
                console.log(x.dataValues.EquipmentId,'equid');
                await db.Equipment.update({
                    availability: 1,
                    status: status
                }, {
                    where: { id: x.dataValues.EquipmentId },
                    transaction: t
                })
            });
            await t.commit();
        } catch (error) {
             console.log(error);
            await t.rollback();
           
        }
    }

    async getReport(fromdate, toDate, categories) {
        const t = await db.sequelize.transaction();
        
    }
}
module.exports = BorrowData;