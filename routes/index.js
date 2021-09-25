
const routes = require('express').Router();

routes.use('/technicalofficer', require('./technical_officer/technical_officer'));

module.exports = routes;