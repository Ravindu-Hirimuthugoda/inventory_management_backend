const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const TemporyBorrowing = sequelize.define('TemoryBorrowing',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    requestId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    studentId:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    borrowingId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{
    sequelize,
    timestamps:false,
    modelName:'TemporyBorrowing',
    tableName: 'temporyBorrowing',
});

module.exports = TemporyBorrowing;