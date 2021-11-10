
const express = require('express');
const authorization = require('../../middleware/authorization');
const router = express.Router();
const  {addmodel,addcategory,Getcategories,findIteamsByCatogary,getBorrowData,Getlabs,GetModels,AddEquipment,findIteamByid,UpdateEquipment,temporyBorrow,normalBorrow,GetlastBorrowData,acceptEquipment,GetReport,getRequestData}  = require('../../controllers/techcical_officer_controller');

router.get('/categories', authorization, Getcategories);
router.get('/labs', authorization, Getlabs);
router.get('/models/:category', authorization, GetModels);
router.get('/categories/:categoryid', authorization, findIteamsByCatogary);
router.get('/equipment/:id', authorization, findIteamByid);
router.get('/borrowdata/:store_code', authorization, GetlastBorrowData);
router.post('/borrowdata', authorization, getBorrowData);
router.post('/addequipment', authorization, AddEquipment);
router.post('/updateequipment', authorization, UpdateEquipment);
router.post('/temporyborrowing', authorization, temporyBorrow);
router.post('/acceptEquipment', authorization, acceptEquipment);
router.post('/report', authorization, GetReport);
router.get('/requestdata/:id', authorization, getRequestData);
router.post('/normalborrowing', authorization, normalBorrow);
router.post('/addmodel', authorization, addmodel);
router.post('/addcategory', authorization, addcategory);

module.exports = router;