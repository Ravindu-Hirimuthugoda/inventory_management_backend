const sequelize = require("../config/database");
const request = require('../models/request');
const requestBorrowing = require('../models/requestBorrowing');
const temporyBorrowing = require('../models/temporyBorrowing');
const equipment = require('../models/equipment');
const category = require('../models/category');
const model = require('../models/model');
const lab = require('../models/laboratory');
const userModel= require('../models/user-model');
const student = require('../models/student_model');
const lecturer = require('../models/lecturer');
const { Op } = require('sequelize');
const lecturerBorrowing = require('../models/lecturerBorrowing');
const notificationModel = require('../models/notification');

const LectureModel = require('../models/lecturer');
const ResponseMail = require("../utils/approveMail");

class Lecturer {
    constructor() {
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (err) {
            //console.log('Database error', err);
        }
    }

    async getPendingList(id) {
        request.hasOne(requestBorrowing);
        equipment.hasMany(request);
        request.belongsTo(equipment);

        const result = await request.findAll({ include: [{ model: requestBorrowing, where: { lecturerId: { [Op.eq]: id } }, attributes: ['studentId', 'lecturerId'] }], where: { status: { [Op.eq]: 'pending' } }, attributes: ['id', 'equipmentId', 'requestDate', 'returnDate'], raw: true });
        //console.log(result);
        return result;
    }


    async getPendingDetails(iden) {

        equipment.hasMany(request);
        request.belongsTo(equipment);
        category.hasMany(equipment);
        model.hasMany(equipment);
        lab.hasMany(equipment);
        equipment.belongsTo(category);
        equipment.belongsTo(model);
        equipment.belongsTo(lab);
        request.hasOne(requestBorrowing);

        //console.log(id);


        const result = await equipment.findAll({ include: [{ model: request, where: { id: { [Op.eq]: iden } }, attributes: ['id', 'reason', 'requestDate', 'returnDate'], include: [{ model: requestBorrowing, attributes: ['studentId'] }] }, { model: category, attributes: ['categoryName'] }, { model: lab, attributes: ['labName'] }, { model: model, attributes: ['modelName'] }], attributes: ['id', 'imageURL'], raw: true });

        //console.log(result);
        return result;
    }

    async approveRequest(detail) {
        const result = await request.update({ status: 'pass' }, { where: { id: detail.id } });
        const idnum = await student.findOne({where:{id:detail.studentId},attributes:['userId']});
        const email = await userModel.findOne({where:{id:idnum['userId']},attributes:['email']});
        const name = await lecturer.findOne({where:{id:detail.lecId},attributes:['firstName','lastName']});
        console.log('Here lpl start');
        console.log(detail);
        console.log(email);
        console.log(name);
        ResponseMail({mail:email['email'],ctegory:detail.category,storeCode:detail.storeCode,fname:name['firstName'],lname:name['lastName'],type:'approved'});
        return result;
    }

    async rejectRequest(detail) {
        const result = await request.update({ status: 'fail' }, { where: { id: detail.id } });
        const res = await equipment.update({availability:'1'},{where:{id: detail.storeCode}});
        const idnum = await student.findOne({where:{id:detail.studentId},attributes:['userId']});
        const email = await userModel.findOne({where:{id:idnum['userId']},attributes:['email']});
        const name = await lecturer.findOne({where:{id:detail.lecId},attributes:['firstName','lastName']});
        ResponseMail({mail:email['email'],ctegory:detail.category,storeCode:detail.storeCode,fname:name['firstName'],lname:name['lastName'],type:'rejected'});
        return result;
    }

    async saveNormalData(detail) {
        const transaction = await sequelize.transaction();
        const req = new Date(detail.requestDate).toString();
        const ret = new Date(detail.returnDate).toString();
        const reqDate = this.convert(req);

        const retDate = this.convert(ret);
        //console.log(a);
        //console.log(detail);

        try {
            const total = await request.count();
            console.log(total);
            const req = await request.create({
                id: total + 1,
                status: 'pass',

                reason: 'testiingLecNormal',
                requestDate: reqDate,
                returnDate: retDate,
                equipmentId: detail.equipmentId,

                type: 'normal',
            }, { transaction });


            const borrowingCount = await lecturerBorrowing.count();

            const reqBorr = await lecturerBorrowing.create({

                id: borrowingCount + 1,
                requestId: total + 1,
                lecturerId: detail.lecId,
                borrowingId: null,
            }, { transaction });

            const equpment = await equipment.update({ availability: '0' }, { where: { id: detail.equipmentId } }, { transaction });

            //console.log('success');
            await transaction.commit();
        } catch (err) {

            //console.log('Error');
            await transaction.rollback();
        }
    }


    async saveTemporyData(detail) {
        const transaction = await sequelize.transaction();
        //console.log(a);
        //console.log(detail);

        try {
            const total = await request.count();
            //console.log(total);
            const req = await request.create({
                id: total + 1,
                status: 'pass',

                reason: detail.reason,
                requestDate: detail.requestDate,
                returnDate: detail.returnDate,
                equipmentId: detail.equipmentId,

                type: 'tempory',
            }, { transaction });


            const borrowingCount = await lecturerBorrowing.count();

            const reqBorr = await lecturerBorrowing.create({

                id: borrowingCount + 1,
                requestId: total + 1,
                lecturerId: detail.lecId,
                borrowingId: null,
            }, { transaction });

            const equpment = await equipment.update({ availability: '0' }, { where: { id: detail.equipmentId } }, { transaction });

            //console.log('success');
            await transaction.commit();
        } catch (err) {

            //console.log('Error');
            await transaction.rollback();
        }
    }

    convert(str) {
        var date = new Date(str),

            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    //! - uditha part
    async createLecturer(index, firstName, lastName, uid, department) {
        console.log("create lecture");
        const lecture = await LectureModel.create({
            id: index,
            firstName: firstName,
            lastName: lastName,
            department: department,
            userId: uid
        });
        if (lecture == null) {
            return null;
        }
        console.log(lecture);
        return lecture;
    }

    async getLecturerByID(index) {
        let cnt = await LectureModel.count({
            where: {
                id: index
            }
        });

        if (cnt > 0) {
            return null;
        } else {

            return "no user";
        }


    }

    async readLastEntry() {
        const lecturers = await LectureModel.findAll({
            limit: 1,
            order: [['createdAt', 'DESC']]
        });
        if (lecturers == null) {
            throw new Error('Something went wrong!');
        }
        console.log(lecturers);
        return lecturers;
    }

    async readAllLecture() {
        console.log("read Lecture");
        const lecture = await LectureModel.findAll();
        if (lecture == null) {
            throw new Error('Something went wrong!');
        }
        console.log(lecture);
        return lecture;

    }

    async saveNotificationByLec(detail){
        console.log('readHere');
        const notifiCount = await notificationModel.count();
        console.log(notifiCount);
        const notifi = await notificationModel.create({
            id: notifiCount+1,
            senderId: detail.lecId,
            receiverId: detail.studentId,
            message: detail.notification,
            status: 'notread',
        });

        if (notifi==null){
            console.log('somethig went wrong');
            return;
        }
        console.log(notifi);
        console.log('notiiction created');
        return notifi;

    }




}

module.exports = Lecturer;