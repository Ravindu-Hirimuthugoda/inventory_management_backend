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

}
module.exports = Category;