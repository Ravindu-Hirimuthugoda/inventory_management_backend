

const { errorMessage } = require("../utils/response_message");

const typeValidator =async (res, currentType,serverType ) =>{
   //token set to auth header by client
    if (currentType != serverType ) {
        return errorMessage(res, "request failed , Invalid user type!!!", 401);
    }

}



module.exports = typeValidator;