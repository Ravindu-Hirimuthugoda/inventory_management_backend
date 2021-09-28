const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const RequestBorrowingModel = sequelize.define('RequestBorrowing',{
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    requestId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    borrowingId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    studentId:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    lecturerId:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize,
    timestamps:false,
    modelName: 'RequestBorrowing',
    tableName: 'requestBorrowing',
});

module.exports = RequestBorrowingModel;