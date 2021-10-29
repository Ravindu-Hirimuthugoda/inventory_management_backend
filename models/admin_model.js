const {DataTypes, ENUM} = require('sequelize');
const sequelize = require('../config/database');


var Admin = sequelize.define('admin', {
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


  module.exports = Admin;