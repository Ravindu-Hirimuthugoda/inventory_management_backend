const jwt = require('jsonwebtoken');
// const config = require('config');
// const md5 = require('md5');
const bcrypt = require("bcrypt");
const { successMessage, errorMessage } = require("../utils/response_message");
const UserService = require('../services/user');



let userService = new UserService();

const login = async (req, res, next) => {
 
    try {
        console.log(req.body);
        const email = req.body.email;
        const password = req.body.password;        
        let user;
        let role;
        try {
            user = await userService.getUser(email);
            role =  await userService.readUserRole(user.id, user.type.toString());
            if(role == null){
                return errorMessage(res, 'Invalid email or password', 401);
            }
            console.log(user);
            console.log(role);
            const validPassword = await bcrypt.compare(password, user.password);
            if(validPassword){              
                jwt.sign({ userID: role.id, expiresIn: 3600, type:user.type, firstName: role.firstName, lastName: role.lastName,email: user.email},"secretKey",(err,token)=>{
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