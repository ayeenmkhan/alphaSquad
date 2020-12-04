const express= require('express');
const router= express.Router();
const { getToken }= require('../controller/meeting/meetings');

router.route('/')
.get(getToken);


module.exports=router;