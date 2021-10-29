const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const UserModel = sequelize.define('User',{
    id:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize,
    timestamps: false,
    modelName: 'User',
    tableName: 'user',
});

module.exports=UserModel;
