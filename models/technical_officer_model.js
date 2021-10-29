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
  }, {
    sequelize,
    freezeTableName: true,

  });
  

  module.exports = TechnicalOfficer;