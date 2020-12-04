let jwt = require("jsonwebtoken");
/**
 * @implements token validation. If token is expired or null.It blocks the request to process furthuer.
 */

let tokenMW = ((req, res, next) => {

    let token = req.headers.token;
    // console.log(token);
    if (token == null) {
        let response={
            "code":303,
            "message":"unauthorized User"
        }
        res.json(response);
    } else {

        /**
         * check token if it's expired or not
         */

        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if (error) {
                let response={
                    "code":303,
                    "message":"unauthorized User"
                }
                res.json(response);
            } else {
                req.user_data = decoded; // adds users info in token to req object  || contains user id, email address and parent company id
                next();
            }
        });
    }
});

module.exports = tokenMW;
