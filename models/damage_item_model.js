const sequelizeConfig =require("../config/database_config");
const {DataTypes} = require('sequelize');

// const ItemModel = require('./item_model');

var DamageItem = sequelizeConfig.define('damageitem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:true
    },
    reason: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    itemStatus: {
        type: DataTypes.ENUM("pending","repair","close"),
        defaultValue: "pending",
        allowNull:false
      },
    openDate: {
      type: DataTypes.DATE,
      allowNull:false
    },
    closeDate: {
      type: DataTypes.DATE,
      allowNull: true
    },

  }, {
    freezeTableName: true,
    timestamps: false
  });

  // DamageItem.sync({force: true}).then(function () {
  //   // Table created
  //   return DamageItem.create({
  //     reason: "Lense broken",
  //     itemStatus: 'pending',
  //     openDate: '2021-09-24 19:55:53',
  //     equipmentId: 1
  //   });
  // });


  module.exports = DamageItem;