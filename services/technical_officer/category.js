const db = require('../../config/database')


class Category{
    constructor() {
        try {
            db.sequelize.authenticate();
           
        } catch (error) {
            
        }
    }

    async getAllCategories() {
         const categories = db.Category.findAll({
            attributes: ['id', 'categoryName'], raw: true
        })

        return categories;
    }

}
module.exports = Category;