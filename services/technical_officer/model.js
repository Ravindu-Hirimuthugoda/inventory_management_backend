const sequelize = require("../../config/database");
const db = require('../../models/allmodels');



class Model{
    constructor() {
        try {
            sequelize.sequelize.authenticate();
           
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
     async addmodel(model , category) {
         const equipment =await db.Model.findOne({
            where: {
                 modelName:model,
                categoryId: category
            }
        }).then().catch(error => {
            console.log(error);
        });
        if (equipment != null) {
            return null;
        }
        const re= await db.Model.count().then( async c => {
        
            const eq=await db.Model.create({
                id: c + 1,
                categoryId: category,
                modelName:model
    
            }).then(function (x) {
                console.log(x.dataValues);
               

            });
           
        });
      return this.getModels(category)
    }

}
module.exports = Model;