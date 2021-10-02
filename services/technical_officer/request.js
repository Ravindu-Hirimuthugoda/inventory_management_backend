const db = require('../../config/database')
const { Op,$lt, } = require("sequelize");

class Request{
    constructor() {
        try {
            db.sequelize.authenticate();
           
        } catch (error) {
            
        }
    }

    async GetrequestData(id) {
    
         const request =await db.Request.findOne({
            include: [{
                model: db.Student,
            },{
                model: db.Lecture,
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
             where: {
                 [Op.and]: [{
                     studentId: id
                 },{status:'pass'}]
             }
        })
        console.log(request);
        return request;
    }

}
module.exports = Request;