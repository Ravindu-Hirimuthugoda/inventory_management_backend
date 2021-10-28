const express = require('express');

const router = express.Router();
const  {addmodel,addcategory,Getcategories,findIteamsByCatogary,getBorrowData,Getlabs,GetModels,AddEquipment,findIteamByid,UpdateEquipment,temporyBorrow,normalBorrow,GetlastBorrowData,acceptEquipment,GetReport,getRequestData}  = require('../../controllers/techcical_officer_controller');

router.get('/categories', Getcategories);
router.get('/labs', Getlabs);
router.get('/models/:category', GetModels);
router.get('/categories/:categoryid', findIteamsByCatogary);
router.get('/equipment/:id', findIteamByid);
router.get('/borrowdata/:store_code', GetlastBorrowData);
router.post('/borrowdata', getBorrowData);
router.post('/addequipment', AddEquipment);
router.post('/updateequipment', UpdateEquipment);
router.post('/temporyborrowing', temporyBorrow);
router.post('/acceptEquipment', acceptEquipment);
router.post('/report', GetReport);
router.get('/requestdata/:id', getRequestData);
router.post('/normalborrowing', normalBorrow);
router.post('/addmodel', addmodel);
router.post('/addcategory', addcategory);
module.exports = router;