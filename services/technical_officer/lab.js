
const sequelize = require("../../config/database");
const db = require('../../models/allmodels');



class Lab{
    constructor() {
        try {
            sequelize.sequelize.authenticate();
            db.setRelationship
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