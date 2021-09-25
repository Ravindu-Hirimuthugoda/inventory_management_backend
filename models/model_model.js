'use strict'

module.exports = (sequelize, DataTypes) => {

    const ModelModel = sequelize.define('model', {
        id: {
            type: DataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        modelName: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
        categoryId: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'model',
        timestamps: false,

    });
    return ModelModel;
};