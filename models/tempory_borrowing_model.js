const { DataTypes } = require('sequelize');
const LectureModel = require('./lecture_model');
const BorrowData = require('./borrowing_model');

module.exports = (sequelize) => {
    const TemporyBorrowingModel = sequelize.define('TemporyBorrowing', {
        id: {
            type: DataTypes.INTEGER(11),
            autoincrement: true,
            allowNull: false,
            primaryKey: true
        },
        studentId: {
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
        tableName: 'TemporyBorrowing',
        timestamps: false,

    });
    return TemporyBorrowingModel;
}