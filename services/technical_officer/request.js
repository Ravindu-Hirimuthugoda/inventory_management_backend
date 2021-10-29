
const sequelize = require("../../config/database");
const db = require('../../models/allmodels');

const { Op,$lt, } = require("sequelize");

class Request{
    constructor() {
        try {
            sequelize.sequelize.authenticate();
        } catch (error) {
            
        }
    }

    async GetrequestData(id) {
        const user = await db.User.findOne({ where: { id: id } })
        if (user != null) {
            const usertype = user.dataValues.type;
            var reqId;
            if (usertype === "student") {
                const borrow = await db.RequestBorrowing.findOne({
                    where: {
                        [Op.and]: [{
                            studentId: id
                        }, { borrowingId: null }]
                    }
                })
                reqId = borrow.dataValues.requestId;
            }
            else {
                const borrow = await db.LectureBorrowing.findOne({
                    where: {
                        [Op.and]: [{
                            lecturerId: id
                        }, { borrowingId: null }]
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
            console.log(request);
            return request;
        }
        else {
            return "User Id Invaild";
        }
    }

}

module.exports = Request;