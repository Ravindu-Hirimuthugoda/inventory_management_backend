// const sequelizeConfig =require("../config/database_config");
// const {DataTypes} = require('sequelize');
// const DamageItem = require("./damage_iteam");

// //! TEMP MODEL
// var Equipment = sequelizeConfig.define('equipment', {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement:true,
//       primaryKey:true
//     },
//     imageURL: {
//       type: DataTypes.STRING
//     },
//     category: {
//       type: DataTypes.STRING
//     },
//     modelName: {
//       type: DataTypes.STRING
//     },
//     labName: {
//         type: DataTypes.STRING
//       },
//     availability: {
//         type: DataTypes.BOOLEAN,
//         defaultValue:true
//       },
//       status: {
//         type: DataTypes.STRING
//       },
//       storeCode: {
//         type: DataTypes.STRING
//       },
      
//   }, {
//     freezeTableName: true,
//     timestamps:false
//   });

// Equipment.hasOne(DamageItem);
// DamageItem.belongsTo(Equipment);

// // Equipment.sync({force: true}).then(function () {
// //     // Table created
// //     return Equipment.create({
// //       imageURL: 'https://firebasestorage.googleapis.com/v0/b/perks-test-25b3c.appspot.com/o/img11218.jpg?alt=media&token=be1eab16-9814-45f1-a2cb-81a2ce40ce8e',
// //       category: 'Projector',
// //       modelName: 'P-2010F',
// //       labName: 'Level 2',
// //       availability: false,
// //       status: "Broken",
// //       storeCode: "Lvl2-100"
// //     });
// //   });


//   module.exports = Equipment;