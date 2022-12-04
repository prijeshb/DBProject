var express = require('express');
var router = express.Router();
const {database} = require('../helpers/connector/dbConnector')


module.exports = {router:router,
database:database};
