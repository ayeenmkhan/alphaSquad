const mogoose= require('mongoose');

const meetingSchema= new mogoose.Schema({
    id:{
        type:String,
        trim:true,
        required:[true,'Please Add Id']
    },
    title:{
        type:String,
        required:[true,'Please add valid Title']
    },
    agenda:{
        type:String,
        required:[true,'Please add valid Agenda']
    },
    scheduledAt:{
        type:String,
        required:[true,'Please add valid Schedule']
    },

    timestamps:{
        type:Date,
        default:Date.now
    }
})

module.exports=mogoose.model('meetings',meetingSchema)