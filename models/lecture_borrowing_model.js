const { DataTypes } = require('sequelize');
const LectureModel = require('./lecture_model');
const BorrowData = require('./borrowing_model');

module.exports = (sequelize) => {
    const LectureBorrowingModel = sequelize.define('LecturerBorrowing', {
        id: {
            type: DataTypes.INTEGER(11),
            autoincrement: true,
            allowNull: false,
            primaryKey: true
        },
        lecturerId: {
            type: DataTypes.STRING(8),
            allowNull: false,
            references: {
                model: LectureModel,
                key: 'id',
            }
        },
        borrowingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: BorrowData,
                key: 'id',
            }
    },
        reason: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    }, {
        tableName: 'LecturerBorrowing',
        timestamps: false,

    });
    return LectureBorrowingModel;
}