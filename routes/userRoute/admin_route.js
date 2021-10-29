const express = require('express');
const router = express.Router();
const authorization = require('../../middleware/authorization');

const adminController = require('../../controllers/admin_controller');


router.post('/create-admin', authorization,adminController.addAdmin);
router.post('/create-student',authorization ,adminController.addStudent);
router.post('/create-lecture',authorization, adminController.addLecturer);
router.post('/create-officeclerk',authorization, adminController.addOfficeClerk);
router.post('/create-technicalofficer',authorization, adminController.addTechnicalOfficer);
router.post('/create-laboratory',authorization, adminController.addLaboratory);

router.get('/last-student',authorization,adminController.getLastStudent);
router.get('/last-lecture',authorization,adminController.getLastLecture);
router.get('/last-officeclerk',authorization,adminController.getLastOfficeClerk);
router.get('/last-technicalofficer',authorization,adminController.getLastTechnicalOfficer);
router.get('/last-admin',authorization,adminController.getLastAdmin);


router.get('/get-all-labs',authorization, adminController.getLaboratory);



module.exports = router;