
const express= require('express');
const router= express.Router();
const crypto = require('crypto');

router.get('/api/v1/createMeeting', function(req, res) {
    console.log(generateSignature(process.env.API_KEY, process.env.API_SECRET, 123456789, 0))
});

function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  // Prevent time sync issue between client signature generation and zoom 
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
  const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
  const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

  return signature
}

// pass in your Zoom JWT API Key, Zoom JWT API Secret, Zoom Meeting Number, and 0 to join meeting or webinar or 1 to start meeting
module.exports=router;