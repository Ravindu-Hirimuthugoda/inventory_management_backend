const {DataTypes, ENUM} = require('sequelize');
const sequelize = require('../config/database');

const BorrowingModel = sequelize.define('Borrowing',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    type:{
        type:ENUM('temporary','normal','lecturer'),
        allowNull:false,
    },
    status:{
        type:ENUM('open','close'),
        allowNull:false,
    },
    dueDate:{
        type:Date,
        allowNull:false,
    },
    returnDate:{
        type:Date,
        allowNull:true,
    },
    fromDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    EquipmentId:{
        type:String,
        allowNull:false,
    },
},{
    sequelize,
    timestamps:false,
    modelName: 'Borrowing',
    tableName: 'borrowing',
});

module.exports = BorrowingModel;