const db = require('../../config/database')


class Lab{
    constructor() {
        try {
            db.sequelize.authenticate();
           
        } catch (error) {
            
        }
    }

    async getAllLabs() {
         const labs = db.Lab.findAll({
            attributes: ['id', 'labName'], raw: true
        })

        return labs;
    }

}
module.exports = Lab;