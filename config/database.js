const dotenv = require("dotenv");


dotenv.config();
const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize("inventoryManagement", "root", "", {
//     dialect:"mysql",
//     host:"localhost",
//     logging:console.log
//   });


console.log(process.env.dbname, process.env.user, process.env.psw)
const sequelize = new Sequelize('heroku_2f094f4ccd51bd3', 'b5f38ad8090f87', 'fabca632', {
  dialect:"mysql",
  host:'us-cdbr-east-04.cleardb.com',

  logging:console.log
});



module.exports = sequelize;

