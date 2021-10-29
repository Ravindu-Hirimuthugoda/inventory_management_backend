const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

var Student = sequelize.define('student', {
    id: {
      type: DataTypes.STRING,
      primaryKey:true
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    department: {
      type: DataTypes.STRING
    },
    userId:{
      type: DataTypes.INTEGER
    }

  }, {
    sequelize,
    timestamps: true,
    modelName: 'student',
    tableName: 'student',
  
  });
  

  module.exports = Student;