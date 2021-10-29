const sequelize = require('../config/database');
const {DataTypes} = require('sequelize');

var OfficeClerk = sequelize.define('officeclerk', {
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
    }

  }, {
    freezeTableName: true,

  });
  


  module.exports = OfficeClerk;