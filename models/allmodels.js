
const db = {}


db.Equipment = require('./equipment');
db.Category = require('./category');
db.Model = require('./model');
db.Lab = require('./laboratory');
db.BorrowData = require('./borrowing');
db.Lecture = require('./lecturer');
db.LectureBorrowing = require('./lecturerBorrowing');

db.Student = require('./student');
db.TemporyBorrowing = require('./temporyBorrowing');
db.Request = require('./request');
db.RequestBorrowing = require('./requestBorrowing');
db.User = require('./user-model');
db.DamageEquipment = require('./damage_iteam');

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

db.LectureBorrowing.belongsTo(db.Request);
db.Request.hasMany(db.LectureBorrowing);

db.TemporyBorrowing.belongsTo(db.Student);
db.Student.hasMany(db.TemporyBorrowing);


db.TemporyBorrowing.belongsTo(db.BorrowData);
db.BorrowData.hasMany(db.TemporyBorrowing);


db.RequestBorrowing.belongsTo(db.BorrowData);
db.BorrowData.hasMany(db.RequestBorrowing);

db.RequestBorrowing.belongsTo(db.Request);
db.Request.hasMany(db.RequestBorrowing);


db.RequestBorrowing.belongsTo(db.Student);
db.Student.hasMany(db.RequestBorrowing);


db.BorrowData.belongsTo(db.Equipment);
db.Equipment.hasMany(db.BorrowData);

//db.Request.belongsTo(db.Student);
//db.Student.hasMany(db.Request);



//db.Request.belongsTo(db.Lecture);
//db.Lecture.hasMany(db.Request);


db.Request.belongsTo(db.Equipment);
db.Equipment.hasMany(db.Request);

module.exports = db;