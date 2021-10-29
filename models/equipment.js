const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const EquipmentModel = sequelize.define('Equipment',{
    id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    imageURL:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    categoryId:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    modelId:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    labId:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    availability:{
        type:DataTypes.TINYINT,
        allowNull:false,
    },
    status:{
        type: DataTypes.ENUM('damage', 'notdamage'),
        allowNull:false,
    },
    addDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},{
    sequelize,
    timestamps:false,
    modelName:'Equipment',
    tableName: 'equipment',
});

module.exports = EquipmentModel;
