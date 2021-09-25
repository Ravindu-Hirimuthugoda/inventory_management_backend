const db = require('../../config/database')


class Model{
    constructor() {
        try {
            db.sequelize.authenticate();
           
        } catch (error) {
            
        }
    }

    async getModels(category) {
        console.log('ca',category)
         const labs = db.Model.findAll({
             attributes: ['id', 'modelName'], raw: true,
             where: {
                 categoryId:category
             }
        })
        console.log(labs);
        return labs;
    }

}
module.exports = Model;