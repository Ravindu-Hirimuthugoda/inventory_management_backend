'use strict'
const EquipmentModel = require('./equipment_model');
const LectureModel = require('./lecture_model');
const StudentModel = require('./student_model');


module.exports = (sequelize, DataTypes) => {
    const RequestModel = sequelize.define('request', {
        id: {
        type: DataTypes.INTEGER(3),
        autoincrement: true,
        allowNull: false,
        primaryKey:true
    },
        reason: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        equipmentId: {
            type: DataTypes.STRING(10),
            allowNull: false,
            references: {
                model: EquipmentModel,
                key: 'id',
            }
        },
        status: {
            type: DataTypes.ENUM('pass', 'fail', 'pending'),
            allowNull: false,
        },
        requestDate: {
        type: DataTypes.DATE,
            allowNull: false,
        },
        lecturerId: {
            type: DataTypes.STRING(8),
            allowNull: false,
            references: {
                model: LectureModel,
                key: 'id',
            }
        },
        studentId: {
            type: DataTypes.STRING(8),
            allowNull: false,
            references: {
                model: StudentModel,
                key: 'id',
            }
        },
    }, {
        tableName: 'request',
        timestamps: false,
       
    });

    return RequestModel;
};
