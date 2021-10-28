const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const RequestModel = sequelize.define('Request',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    status:{
        type:DataTypes.ENUM('pass','fail','pending'),
        allowNull:false,
    },
    reason:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    requestDate:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    returnDate:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    equipmentId:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    type:{
        type:DataTypes.ENUM('tempory','normal'),
        allowNull:false,
    }
},{
    sequelize,
    timestamps:false,
    modelName: 'Request',
    tableName:'request',
});

module.exports = RequestModel;