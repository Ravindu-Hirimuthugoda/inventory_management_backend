'use strict'
const CategoryModel = require('./category_model');
const ModelModel = require('./model_model');
const LabModel = require('./lab_model');



module.exports = (sequelize, DataTypes) => {
    const EquipmentModel = sequelize.define('Equipment', {
        id: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true
        },
        imageURL: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
            references: {
                model: CategoryModel,
                key: 'id',
            }
        },
        modelId: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
            references: {
                model: ModelModel,
                key: 'id',
            }
        },
        LaboratoryId: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
            references: {
                model: LabModel,
                key: 'id',
            }
        },
        availability: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
        
        },
        status: {
            type: DataTypes.ENUM('damaged', 'notdamaged'),
            allowNull: false,
        },
        addDate: {
        type: DataTypes.DATE,
            allowNull: false,
    },
    }, {
        tableName: 'Equipment',
        timestamps: false,
       
    });

    return EquipmentModel;
};
