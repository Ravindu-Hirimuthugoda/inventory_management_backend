const { DataTypes } = require('sequelize');
const StudentModel = require('./student_model');
const BorrowData = require('./borrowing_model');
const requestmodel = require('./requestmodel');

module.exports = (sequelize) => {
    const RequestBorrowing = sequelize.define('requestborrowing', {
        id: {
            type: DataTypes.INTEGER(11),
            autoincrement: true,
            allowNull: false,
            primaryKey: true
        },
        requestId: {
            type: DataTypes.STRING(8),
            allowNull: false,
            references: {
                model: requestmodel,
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
    }
    }, {
        tableName: 'requestborrowing',
        timestamps: false,

    });
    return RequestBorrowing;
}