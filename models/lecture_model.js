const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const LectureModel = sequelize.define('lecturer', {
        id: {
            type: DataTypes.STRING(8),
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING(10),
            allowNull:false
        },
        lastName: {
            type: DataTypes.STRING(20),
            allowNull:false
        },
        department: {
            type: DataTypes.STRING(20),
            allowNull:false
        },
    }, {
        tableName: 'lecturer',
        timestamps: false,

    });
    return LectureModel;
        
}