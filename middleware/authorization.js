
const jwt = require('jsonwebtoken');
const { errorMessage } = require("../utils/response_message");

function authorization(req, res, next) {
    const authHeader = req.get('Authorization');      //token set to auth header by client
    if (!authHeader) {
        return errorMessage(res, "No token, authentication failed", 401);
    }

    const token = authHeader.split(' ')[1];
    console.log(token) //'Bearer token'-->['Bearer','token']-->'token'    ;
    let decodedToken;
    try {
        
        decodedToken = jwt.verify(token, "secretKey");
        console.log(decodedToken);
    }

    catch (err) {
        console.log(err);
        errorMessage(res, "Something went wrong", 500);
    }

    if (!decodedToken) {
        return errorMessage(res, "Not authenticated.", 401);
    }
    console.log(decodedToken.type);
    
    req.user = decodedToken;
    console.log(req.user.type);
    next();
}

module.exports = authorization;