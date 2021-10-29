const sequelizeConfig =require("../config/database_config");
const {DataTypes} = require('sequelize');


var Department = sequelizeConfig.define('department', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    departmentName: {
      type: DataTypes.STRING
    },
  }, {
    freezeTableName: true,
    timestamps: false


  });

  Department.sync({force: true}).then(function () {
    // Table created
    return Department.create({
        departmentName: "CSE"
    });
  });



  module.exports = Department;