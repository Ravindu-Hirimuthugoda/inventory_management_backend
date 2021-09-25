const express = require('express');
const router = express.Router();
const authorization = require('../../middleware/authorization');

const { addAdmin ,addLaboratory,addLecturer,addOfficeClerk,addTechnicalOfficer,addStudent,getLaboratory} = require('../../controllers/admin_controller');


router.post('/create-admin', addAdmin);
router.post('/create-student', addStudent);
router.post('/create-lecture', addLecturer);
router.post('/create-officeclerk', addOfficeClerk);
router.post('/create-technicalofficer', addTechnicalOfficer);
router.post('/create-laboratory', addLaboratory);


router.get('/get-all-labs',authorization, getLaboratory);

// router.get('/api',(req,res)=>{
//     res.json({
//         message:"Hello world",
//     });
// });

module.exports = router;