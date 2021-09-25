const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const StudentModel = sequelize.define('student', {
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
        tableName: 'student',
        timestamps: false,

    });
    return StudentModel;
        
}