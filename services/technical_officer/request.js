
const sequelize = require("../../config/database");
const db = require('../../models/allmodels');

const { Op, $lt, } = require("sequelize");

class Request {
    constructor() {
        try {
            sequelize.sequelize.authenticate();
        } catch (error) {

        }
    }

    async GetrequestData(id) {
        let usertype;
        let user = await db.Student.findOne(
            {
                where: { id: id }
            });
        if (user == null) {
            user = await db.Lecture.findOne(
                {
                    where: { id: id }
                });
            usertype = "lecturer";
        }
        else {
            usertype = "student";
        }
        //const user = await db.User.findOne({ where: { id: id } })
        if (user != null) {
            //const usertype = user.dataValues.type;
            var reqId;
            if (usertype === "student") {
                const borrow = await db.RequestBorrowing.findOne({

                    include: [{
                        model: db.Request,
                    }],
                    where: {
                        [Op.and]: [{
                            studentId: id
                        }, { borrowingId: null }, { '$Request.status$': 'pass' }]
                    }
                })

                if (borrow.dataValues == null) {
                    const borrowtem = await db.TemporyBorrowing.findOne({

                        include: [{
                            model: db.Request,
                        }],
                        where: {
                            [Op.and]: [{
                                studentId: id
                            }, { borrowingId: null }]
                        }
                    })
                    reqId = borrowtem.dataValues.requestId;

                }
                else {
                    reqId = borrow.dataValues.requestId;
                }
            }
            else {
                const borrow = await db.LectureBorrowing.findOne({
                    include: [{
                        model: db.Request,
                    }],
                    where: {
                        [Op.and]: [{
                            lecturerId: id
                        }, { borrowingId: null }, { '$Request.status$': 'pass' }]
                    }
                })
                reqId = borrow.dataValues.requestId;
            }
            const request = await db.Request.findOne({
                include: [{
                    model: db.Equipment,
                    include: [{
                        model: db.Category,
                    }, {
                        model: db.Model,
                    }, {
                        model: db.Lab,
                    }]
                }],
                where: {
                    [Op.and]: [{
                        id: reqId
                    }, { status: 'pass' }]
                }
            })

            return request;
        }
        else {
            return "User Id Invaild";
        }
    }

}

module.exports = Request;