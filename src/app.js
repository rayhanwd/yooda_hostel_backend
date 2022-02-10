const express = require('express');
const logger = require('morgan');
require('dotenv').config({ path: `${__dirname}/../.env` });
//import routes
const indexRouter = require('./routes');
require('./db/db');

//create app
const app = express();

//use all in app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//decleare all route by path
app.use('/',indexRouter);

module.exports = app;
