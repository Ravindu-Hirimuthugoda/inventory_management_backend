const express = require('express');
const router = express.Router();

const { login } = require('../controllers/auth_controller');


router.post('/', login);


// router.get('/api',(req,res)=>{
//     res.json({
//         message:"Hello world",
//     });
// });

module.exports = router;