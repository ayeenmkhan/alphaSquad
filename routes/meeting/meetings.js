const express= require('express');
const router= express.Router();
const { getMeeting, addMeeting, deleteMeeting, updateMeeting }= require('../../controller/meeting/meetings');
var jwt = require('jsonwebtoken');

router.route('/')
.get(getMeeting)
.post(addMeeting)
.put(updateMeeting);

router.route('/:id')
.delete(deleteMeeting);


module.exports=router;