const sequelizeConfig =require("../config/database_config");
const {DataTypes} = require('sequelize');
const TechnicalOfficer = require("./technical_officer_model");

var Laboratory = sequelizeConfig.define('laboratory', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:true,

    },
    labName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    department: {
      type: DataTypes.STRING,
      allowNull:false
    },
    
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  });
  
Laboratory.hasOne(TechnicalOfficer);

  module.exports = Laboratory;