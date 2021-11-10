
const express = require("express");
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');

const dotenv = require("dotenv");

dotenv.config();
const port =process.env.PORT|| 5000;

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use('/', routes);


console.log(process.env.user);


module.exports = app;

app.listen(port, () => {
    console.log(`running ${port}`);
});







