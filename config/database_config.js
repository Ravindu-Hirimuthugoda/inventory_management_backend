
// const config = require('./config');

const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(config.database, config.user, config.password, {
//     host: config.host,
//     port: config.port,
//     dialect: 'mysql'
//   });


  var sequelize = new Sequelize('newdb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });



module.exports=sequelize;