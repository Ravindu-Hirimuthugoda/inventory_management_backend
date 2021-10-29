const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Lecturer = sequelize.define('Lecturers',{
    id:{
        // type: DataTypes.INTEGER,
        type: DataTypes.STRING,
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
    },
    userId:{
        type: DataTypes.INTEGER
      }
},{
    sequelize,  
    modelName: 'Lecturer',
    tableName: 'lecturer',
});

module.exports = Lecturer;