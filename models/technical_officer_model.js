const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

var TechnicalOfficer = sequelize.define('technicalofficer', {
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
    userId:{
      type: DataTypes.INTEGER
    },
    laboratoryId:{
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    freezeTableName: true,

  });
  

  module.exports = TechnicalOfficer;