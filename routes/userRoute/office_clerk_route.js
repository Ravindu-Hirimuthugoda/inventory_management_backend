const express = require('express');
const router = express.Router();
const authorization = require('../../middleware/authorization');

const officeClerkController = require('../../controllers/office_clerk_controller');


router.get('/get-new-damage-item', authorization,officeClerkController.getNewDamageItem);
router.get('/get-old-damage-item',authorization, officeClerkController.getFinishedDamageItem);
router.get('/get-under-repair-item',authorization, officeClerkController.getUnderRepairItem);

router.put('/send-to-repair/:damageid',authorization, officeClerkController.markAsSendToRepair);
router.put('/finish-repair/:damageid',authorization, officeClerkController.markAsFinishedRepair);





module.exports = router;