
const express = require("express");
const app = express();
const routes = require('./routes/index');
const bodyParser = require('body-parser');

const port = 5000;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use('/', routes);


module.exports =app;

