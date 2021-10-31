// const sequelize=require('../config/database_config');
const sequelize = require("../config/database");

const DamageItemModel = require('../models/damage_iteam');
const { Op } = require("sequelize");

const ItemModel = require("../models/equipment");
const category = require('../models/category');
const model = require('../models/model');
const lab = require('../models/laboratory');

class DamageItemService {

    constructor() {
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async readNewDamageItem() {

        category.hasMany(ItemModel);
        model.hasMany(ItemModel);
        lab.hasMany(ItemModel);
        ItemModel.belongsTo(category);
        ItemModel.belongsTo(model);
        ItemModel.belongsTo(lab);

        let outs = [];

        const result = await DamageItemModel.findAll({
            where: { status: "pending" },
            raw: true
        });

        for (let i = 0; i < result.length; i++) {

            let id = result[i].itemId;
            const item = await ItemModel.findOne({
                include: [
                    { model: category, attributes: ['categoryName'] },
                    { model: lab, attributes: ['labName'] },
                    { model: model, attributes: ['modelName'] }
                ],
                where: { id: id },
                raw: true
            });

            let tempObj = {
                reason: result[i].reason
            }
            outs.push({
                ...item,
                ...tempObj,
            })
        }
        if (outs == null) {
            throw new Error('Something went wrong!');;
        }

        return outs;
    }

    async readUnderRepairDamageItem() {

        category.hasMany(ItemModel);
        model.hasMany(ItemModel);
        lab.hasMany(ItemModel);
        ItemModel.belongsTo(category);
        ItemModel.belongsTo(model);
        ItemModel.belongsTo(lab);

        let outs = [];

        const result = await DamageItemModel.findAll({
            where: { status: "repair" },
            raw: true
        });

        for (let i = 0; i < result.length; i++) {

            let id = result[i].itemId;
            const item = await ItemModel.findOne({
                include: [
                    { model: category, attributes: ['categoryName'] },
                    { model: lab, attributes: ['labName'] },
                    { model: model, attributes: ['modelName'] }
                ],
                where: { id: id },
                raw: true
            });

            let tempObj = {
                reason: result[i].reason
            }
            outs.push({
                ...item,
                ...tempObj,
            })
        }
        if (outs == null) {
            throw new Error('Something went wrong!');;
        }

        return outs;

    }

    async markFinishedRepair(id, status,itemId) {
        const damageItems = await DamageItemModel.update(
            {closeDate : sequelize.literal('CURRENT_TIMESTAMP'), status: status },
            {

            where:{id: id},

        });
        const items = await ItemModel.update(
            { status: "notdamage",availability: 1 },
            { where: {status:"damage" , id: itemId},}
        );

        if(damageItems == null || items == null){
            throw new Error('Something went wrong!');;
        }
        return true;

    }
    async markAsSendToRepair(id, status) {
        const damageItems = await DamageItemModel.update(
            {status: status },
            {

            where:{status:"pending" , id: id},

        });
        if(damageItems == null){
            throw new Error('Something went wrong!');;
        }
        return true;

    }

    async readOldDamageItem() {
     
        category.hasMany(ItemModel);
        model.hasMany(ItemModel);
        lab.hasMany(ItemModel);
        ItemModel.belongsTo(category);
        ItemModel.belongsTo(model);
        ItemModel.belongsTo(lab);

        let outs = [];

        const result = await DamageItemModel.findAll({
            where: { status: "close" },
            raw: true
        });

        for (let i = 0; i < result.length; i++) {

            let id = result[i].itemId;
            const item = await ItemModel.findOne({
                include: [
                    { model: category, attributes: ['categoryName'] },
                    { model: lab, attributes: ['labName'] },
                    { model: model, attributes: ['modelName'] }
                ],
                where: { id: id },
                raw: true
            });

            let tempObj = {
                reason: result[i].reason
            }
            outs.push({
                ...item,
                ...tempObj,
            })
        }
        if (outs == null) {
            throw new Error('Something went wrong!');;
        }

        return outs;

    }

}

module.exports = DamageItemService;