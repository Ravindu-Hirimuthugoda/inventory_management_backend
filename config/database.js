const dotenv = require("dotenv");
const config = require('./config');
require('dotenv').config()

const { Sequelize } = require('sequelize');

<<<<<<< HEAD
const sequelize = new Sequelize(process.env.dbname, process.env.usersname, process.env.psw, {
=======
const sequelize = new Sequelize(process.env.dbname, process.env.username, process.env.psw, {
>>>>>>> 3721db27ec71889c8e7f14527f4fe27296e4f2aa
  dialect:"mysql",
  host:process.env.host,
  logging:console.log
});



module.exports = sequelize;


