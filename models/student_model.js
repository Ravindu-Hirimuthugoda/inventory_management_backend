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
  }, {
    sequelize,
  
  });
  

  module.exports = Student;