const sequelizeConfig =require("../config/database_config");
const Sequelize = require('sequelize');
const Admin = require("./admin_model");
const Student = require("./student_model");
const OfficeClerk = require("./office_clerk_model");
const Lecturer = require("./lecture_model");
const TechnicalOfficer = require("./technical_officer_model");



const User = sequelizeConfig.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey:true
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  isDelete: {
    type: Sequelize.BOOLEAN
  }
}, {
  freezeTableName: true
});


User.hasOne(Admin);
User.hasOne(Student);
User.hasOne(Lecturer);
User.hasOne(OfficeClerk);  
User.hasOne(TechnicalOfficer);   


(async () => {
  await sequelizeConfig.sync();
})();


  module.exports = User;