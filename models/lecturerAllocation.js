const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const LecturerAllocation = sequelize.define('LecturerAllocation',{
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    lecturerId:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    labId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{
    sequelize,
    timestamps:false,
    modelName: 'LecturerAllocation',
    tableName: 'lecturerAllocation',
});

module.exports = LecturerAllocation;