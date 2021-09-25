const sequelizeConfig =require("../config/database_config");
const {DataTypes} = require('sequelize');

var OfficeClerk = sequelizeConfig.define('officeclerk', {
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

  }, {
    freezeTableName: true,
    timestamps:false
  });
  


  module.exports = OfficeClerk;