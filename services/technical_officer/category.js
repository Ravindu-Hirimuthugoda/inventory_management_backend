const sequelize = require("../../config/database");
const db = require('../../models/allmodels');

class Category{
    constructor() {
        try {
            sequelize.sequelize.authenticate();
           
        } catch (error) {
            
        }
    }

    async getAllCategories() {
        
        const categories = await db.Category.findAll({
            attributes: ['id', 'categoryName'], raw: true
        });
        console.log(categories);
        console.log("hi")
        return categories;
    }
    async addcategory(category) {
          const equipment =await db.Category.findOne({
            where: {
                categoryName: category
            }
        }).then().catch(error => {
            console.log(error);
        });
        if (equipment != null) {
            return null;
        }
        else {
            const re = await db.Category.count().then(async c => {
        
                const eq = await db.Category.create({
                    id: c + 1,
                    categoryName: category
    
                }).then(function (x) {
               
               

                });
           
            });
            return this.getAllCategories()
        }
    }

}
module.exports = Category;