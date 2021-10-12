const config = require('./config');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("inventoryManagement", "root", "", {
    dialect:"mysql",
    host:"localhost",
    logging:console.log
  });


module.exports = sequelize;