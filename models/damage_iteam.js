const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DamageItemModel = sequelize.define('DamageItem', {
    id: {
        type: DataTypes.INTEGER(3),
        autoincrement: true,
        primaryKey: true
    },
    itemId: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    openDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    closeDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    status: {
        type: DataTypes.ENUM('pending', 'repair', 'close'),
        allowNull: false
    }
}, {
     sequelize,
    timestamps:false,
    modelName:'damageitem',
    tableName: 'damageitem',

});
module.exports = DamageItemModel;