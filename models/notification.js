const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const NotificationModel = sequelize.define('Notification',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
    },
    senderId:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    receiverId:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    message:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM('read','notread'),
        allowNull:false,
    }
},{
    sequelize,
    timestamps:false,
    modelName: 'Notification',
    tableName: 'notification',
});

module.exports =NotificationModel;