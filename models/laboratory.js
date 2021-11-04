const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const LabModel = sequelize.define('Lab',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    labName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    department:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize,
    timestamps:false,
    modelName: 'Lab',
    tableName: 'laboratory',
});

module.exports = LabModel;