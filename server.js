var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var config = require('./config/config'),
        mongoose = require('./config/mongoose'),
        express = require('./config/express'),
        db = mongoose(),
        app = express();

const port = process.env.PORT || '8080';
app.listen(port);
console.log(`Hey Your Port is ${port}`);
exports = module.exports = app;
