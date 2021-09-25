const express = require('express');

const router = express.Router();
const  {Getcategories,findIteamsByCatogary,getBorrowData,Getlabs,GetModels,AddEquipment,findIteamByid,UpdateEquipment,temporyBorrow,GetlastBorrowData,acceptEquipment,GetReport}  = require('../../controllers/technical_officer/techcical_officer_controller');

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

module.exports = router;