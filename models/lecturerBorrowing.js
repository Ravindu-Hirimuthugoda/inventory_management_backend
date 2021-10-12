const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const LecturerBorrowing = sequelize.define('LecturerBorrowing',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    requestId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    lecturerId:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    borrowingId:{
        type:DataTypes.INTEGER,
        allowNull:true,
    }
},{
    sequelize,
    timestamps:false,
    modelName: 'LecturerBorrowing',
    tableName: 'lecturerBorrowing',
});

module.exports = LecturerBorrowing;