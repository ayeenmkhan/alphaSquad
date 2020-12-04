const Meeting = require('../../model/meetings');
var jwt = require('jsonwebtoken');

exports.getToken=async (req, res,next)=>{
try{
    let token= createUserToken('ayeen@gmail.com','00238');
    return res.status(201).json({
        success: true,
        token: token
    })
}catch(err){
    console.log(err);
}
}
let createUserToken = (email, id) => {

    return jwt.sign({
        email: email,
        id: id
    },
        process.env.SECRET_KEY, {
        expiresIn: '21h'
    });

}
exports.addMeeting = async (req, res, next) => {
    try {
        const transaction = await Meeting.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            Code: 500,
            error: 'Server Error'
        })

    }
}


exports.updateMeeting = async (req, res, next) => {
    try {
        if (req.headers.user_type == 0) {
            const transaction = await Meeting.updateOne({ "_id": req.body.meeting_id }, req.body);

            return res.status(201).json({
                success: true,
                data: "Meeting Updated Successfuly"
            })
        } else {
            return res.status(303).json({
                success: false,
                code: 303,
                error: 'User Not Authorized to do this Action'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            Code: 500,
            error: 'Server Error'
        })

    }
}

exports.getMeeting = async (req, res, next) => {
    try {
        const transaction = await Meeting.find();
        if (!transaction) {
            return res.status(404).json({
                success: false,
                code: 404,
                error: "Not Found"
            })
        } else {
            return res.status(201).json({
                success: true,
                data: transaction
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            Code: 500,
            error: 'Server Error'
        })

    }
}

exports.deleteMeeting = async (req, res, next) => {
    try {
        if (req.headers.user_type == 0) {
            const transaction = await Meeting.findById(req.params.id);
            if (!transaction) {
                return res.status(404).json({
                    success: false,
                    code: 404,
                    error: 'No data found'
                })
            } else {
                await transaction.remove();
                return res.status(200).json({
                    success: true,
                    message: 'Successfuly delete the Meeting'
                })
            }
        } else {
            return res.status(303).json({
                success: false,
                code: 303,
                error: 'User Not Authorized to do this Action'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 500,
            error: 'Server Error'
        })
    }
}