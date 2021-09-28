const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('Model',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
    },
    categoryId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    modelName:{
        type: DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize,
    timestamps:false,
    modelName: 'Model',
    tableName: 'Model',
});

module.exports =Model;