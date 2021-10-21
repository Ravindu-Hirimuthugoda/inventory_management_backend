const sequelizeConfig =require("../config/database_config");
const {DataTypes} = require('sequelize');

var TechnicalOfficer = sequelizeConfig.define('technicalofficer', {
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

  });
  

  module.exports = TechnicalOfficer;