const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const CategoryModel = sequelize.define('Category',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    categoryName:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize,
    timestamps:false,
    modelName: 'Category',
    tableName: 'Category',
});

module.exports = CategoryModel;