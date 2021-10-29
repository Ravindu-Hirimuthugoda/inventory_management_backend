const dotenv = require("dotenv");
const config = require('./config');
require('dotenv').config()

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.dbname, process.env.username, process.env.psw, {
  dialect:"mysql",
  host:process.env.host,
  logging:console.log
});



module.exports = sequelize;


