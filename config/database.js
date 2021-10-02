
const Sequelize = require('sequelize');

const sequelize = new Sequelize('inventory', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  omitNull: true,
  
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.Equipment = require('../models/equipment_model')(sequelize, Sequelize);
db.Category = require('../models/category_model')(sequelize, Sequelize);
db.Model = require('../models/model_model')(sequelize, Sequelize);
db.Lab = require('../models/lab_model')(sequelize, Sequelize);
db.BorrowData = require('../models/borrowing_model')(sequelize, Sequelize);
db.Lecture = require('../models/lecture_model')(sequelize);
db.LectureBorrowing = require('../models/lecture_borrowing_model')(sequelize);

db.Student = require('../models/student_model')(sequelize);
db.TemporyBorrowing = require('../models/tempory_borrowing_model')(sequelize);
db.Request = require('../models/requestmodel')(sequelize, Sequelize);
db.RequestBorrowing = require('../models/normal_borrowing')(sequelize);
//Relations


db.Equipment.belongsTo(db.Category);
db.Category.hasMany(db.Equipment);

db.Equipment.belongsTo(db.Model);
db.Model.hasMany(db.Equipment);

db.Equipment.belongsTo(db.Lab);
db.Lab.hasMany(db.Equipment);

db.LectureBorrowing.belongsTo(db.Lecture);
db.Lecture.hasMany(db.LectureBorrowing);

db.LectureBorrowing.belongsTo(db.BorrowData);
db.BorrowData.hasMany(db.LectureBorrowing);

db.TemporyBorrowing.belongsTo(db.Student);
db.Student.hasMany(db.TemporyBorrowing);

db.TemporyBorrowing.belongsTo(db.BorrowData);
db.BorrowData.hasMany(db.TemporyBorrowing);


db.RequestBorrowing.belongsTo(db.BorrowData);
db.BorrowData.hasMany(db.RequestBorrowing);

db.RequestBorrowing.belongsTo(db.Request);
db.Request.hasMany(db.RequestBorrowing);


db.BorrowData.belongsTo(db.Equipment);
db.Equipment.hasMany(db.BorrowData);

db.Request.belongsTo(db.Student);
db.Student.hasMany(db.Request);

db.Request.belongsTo(db.Lecture);
db.Lecture.hasMany(db.Request);

db.Request.belongsTo(db.Equipment);
db.Equipment.hasMany(db.Request);

module.exports = db;

