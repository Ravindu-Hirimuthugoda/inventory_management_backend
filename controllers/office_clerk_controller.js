const { successMessage, errorMessage } = require("../utils/response_message");
const DamageItemService = require('../services/damage_item_service');

//!Dummy Model
// const ItemModel = require("../models/item_model");
// const department = require('../models/department_model');

let damageItemService = new DamageItemService();



const getNewDamageItem = async (req, res, next) => {
    try {
        let damages;  
        console.log("come");
        try {
            damages = await damageItemService.readNewDamageItem();
            if(damages != null){

                return successMessage(res, damages);
            }else{              
                return errorMessage(res, 'Something went wrong', 500);
            }     
        } catch (e) {
            console.log(e);
            return errorMessage(res, 'Something went wrong', 500);
        }
    } catch (err) {
        next(err);
    }  
}
const getUnderRepairItem = async (req, res, next) => {
    try {
        let damages;        
        try {
            damages = await damageItemService.readUnderRepairDamageItem();
            if(damages != null){
                return successMessage(res, damages);
            }else{
                return errorMessage(res, 'Something went wrong', 500);
            }     
        } catch (e) {
            console.log(e);
            return errorMessage(res, 'Something went wrong', 500);
        }
    } catch (err) {
        next(err);
    }  
}

const getFinishedDamageItem = async (req, res, next) => {
    try {
        let damages;        
        try {
            damages = await damageItemService.readOldDamageItem();
            if(damages != null){
                return successMessage(res, damages);
            }else{
                return errorMessage(res, 'Something went wrong', 500);
            }     
        } catch (e) {
            console.log(e);
            return errorMessage(res, 'Something went wrong', 500);
        }
    } catch (err) {
        next(err);
    }  
}

const markAsSendToRepair = async (req, res, next) => {
    try {
        let output;
        const damageId = req.params.damageid;

        try {
            output = await damageItemService.markAsSendToRepair(damageId,"repair");
            if(output){
                return successMessage(res, {update:"update Success"});
            }else{
                return errorMessage(res, 'Something went wrong', 500);
            }     
              
        } catch (e) {
            console.log(e);
            return errorMessage(res, 'Something went wrong', 500);
        }
    } catch (err) {
        next(err);
    }
}
const markAsFinishedRepair = async (req, res, next) => {
    try {
        let output;
        const damageId = req.params.damageid;
        const itemId = req.params.itemid;
        console.log(damageId+ itemId);

        try {
            output = await damageItemService.markFinishedRepair(damageId,"close",itemId);
            if(output){
                return successMessage(res, {update:"update Success"});
            }else{
                return errorMessage(res, 'Something went wrong', 500);
            }     
              
        } catch (e) {
            console.log(e);
            return errorMessage(res, 'Something went wrong', 500);
        }
    } catch (err) {
        next(err);
    } 
}





module.exports = {
    getNewDamageItem,
    getUnderRepairItem,
    getFinishedDamageItem,
    markAsFinishedRepair,
    markAsSendToRepair

}