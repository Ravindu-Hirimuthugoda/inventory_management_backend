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
        // var today = new Date()
        // var dd = String(today.getDate()).padStart(2, '0');
        // var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        // var yyyy = today.getFullYear();
        // var date = yyyy + '-' + mm + '-' + dd;
        // console.log(date);
        // console.log(damageId);
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
        // var today = new Date()
        // var dd = String(today.getDate()).padStart(2, '0');
        // var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        // var yyyy = today.getFullYear();
        // var date = yyyy + '-' + mm + '-' + dd;
        // console.log(date);
        // console.log(damageId);
        try {
            output = await damageItemService.markFinishedRepair(damageId,"finished");
            if(output){
                //!TODO: update item table=> status: available , availability:1
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