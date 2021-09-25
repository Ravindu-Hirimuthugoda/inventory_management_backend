'use strict'

module.exports = (sequelize, DataTypes) => {
    const BorrowingModel = sequelize.define('Borrowing', {
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        primaryKey:true
    },
    type: {
        type: DataTypes.ENUM('tempory', 'normal', 'lecture'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('open', 'close'),
        allowNull:false
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull:false
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull:true
        },
    fromDate: {
        type: DataTypes.DATE,
    },
    EquipmentId: {
        type: DataTypes.STRING(10),
        allowNull: false,
        
    }
},{
    tableName: 'Borrowing',
    timestamps: false,

    });
    return BorrowingModel;
};

