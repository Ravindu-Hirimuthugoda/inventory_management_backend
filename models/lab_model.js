'use strict'
module.exports = (sequelize, DataTypes) => {

    const LabModel = sequelize.define('Laboratory', {
        id: {
            type: DataTypes.INTEGER(3),
            autoincrement: true,
            allowNull: false,
            primaryKey: true
        },
        labName: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        department: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    }, {
        tableName: 'Laboratory',
        timestamps: false,

    });
    return LabModel
};
