const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Lecturer = sequelize.define('student',{
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    department:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    timestamps:false,
    modelName: 'student',
    tableName: 'student',
});

module.exports = Lecturer;