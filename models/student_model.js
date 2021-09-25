const sequelizeConfig =require("../config/database_config");
const {DataTypes} = require('sequelize');

var Student = sequelizeConfig.define('student', {
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
    freezeTableName: true,
    timestamps:false
  });
  

  module.exports = Student;