const jwt = require('jsonwebtoken');
// const config = require('config');
// const md5 = require('md5');
const { successMessage, errorMessage } = require("../utils/response_message");
const UserService = require('../services/user');

let guest = new UserService();

const login = async (req, res, next) => {
 
    try {
        console.log(req.body);
        const email = req.body.email;
        const password = req.body.password;        
        let user;
        try {
            user = await guest.getUser(email);
            const validPassword = await bcrypt.compare(password, user.password);
            if(validPassword){              
                jwt.sign({ userID: user.id, expiresIn: 3600, type:user.type},"secretKey",(err,token)=>{
                        if (err) throw err;
                        return successMessage(res, {token})
                });
            }else{
                return errorMessage(res, 'Invalid email or password', 401);
            }       
        
        } catch (e) {
            return errorMessage(res, 'Invalid email or password', 401);
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    login
}