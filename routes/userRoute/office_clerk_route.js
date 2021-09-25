const express = require('express');
const router = express.Router();

const { getDamageItem } = require('../../controllers/office_clerk_controller');


router.get('/get-damage-item', getDamageItem);




module.exports = router;