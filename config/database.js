const dotenv = require("dotenv");
const config = require('./config');
require('dotenv').config()

const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize("inventoryManagement", "root", "", {
//     dialect:"mysql",
//     host:"localhost",
//     logging:console.log
//   });



const sequelize = new Sequelize(process.env.dbname, process.env.username, process.env.psw, {
  dialect:"mysql",
  host:process.env.host,
  logging:console.log
});



module.exports = sequelize;

// mysql://b5f38ad8090f87:fabca632@us-cdbr-east-04.cleardb.com/heroku_2f094f4ccd51bd3?

// username = b5f38ad8090f87
// psw = fabca632
// host = us-cdbr-east-04.cleardb.com
// dbname = heroku_2f094f4ccd51bd3
//hjklkjhjk
