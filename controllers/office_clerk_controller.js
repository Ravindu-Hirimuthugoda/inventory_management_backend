const { successMessage, errorMessage } = require("../utils/response_message");
const DamageItemService = require('../services/damage_item_service');

const ItemModel = require("../models/item_model");
let damageItemService = new DamageItemService();

let item= new ItemModel();

const getDamageItem = async (req, res, next) => {
    try {
      
        let damages;
        
        try {
            damages = await damageItemService.readNewDamageItem();
            if(damages != null){
                let out = {                    
                    damage: damages
                }
                return successMessage(res, damages);
            }else{
                let out = {                    
                    damage: []
                }                
                return successMessage(res, out);
            }     
        } catch (e) {
            console.log(e);
            return errorMessage(res, 'Something went wrong', 500);
        }
    } catch (err) {
        next(err);
    }  
}

const markDamageItem = async (req, res, next) => {
    
}

const getFinishedDamageItem = async (req, res, next) => {
    
}

module.exports = {
    getDamageItem,
    markDamageItem,
    getFinishedDamageItem,

}