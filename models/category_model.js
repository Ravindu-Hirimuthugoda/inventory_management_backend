'use strict'

module.exports = (sequelize, DataTypes) => {
const CategoryModel = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER(3),
        autoincrement: true,
        allowNull: false,
        primaryKey:true
    },
    categoryName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    }
},{
    tableName: 'Category',
    timestamps: false,

});
    return CategoryModel;
};
