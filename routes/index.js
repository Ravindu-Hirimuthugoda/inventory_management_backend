const routes = require('express').Router();


routes.use('/auth', require('./auth'));
routes.use('/users', require('./users'));

// const routes = require('express').Router();


routes.use('/technicalofficer', require('./technical_officer/technical_officer'));
routes.use('/student', require('./student/student'));
routes.use('/lecturer', require('./lecturer/lecturer'));
module.exports = routes;