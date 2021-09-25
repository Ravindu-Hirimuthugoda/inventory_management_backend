const userRoute = require('express').Router();

userRoute.use('/office-clerk', require('./userRoute/office_clerk_route'));
userRoute.use('/admin', require('./userRoute/admin_route'));

module.exports = userRoute;