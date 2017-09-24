/*jslint es6 */
/*jslint node: true */
"use strict";

let config = require('./config');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let autoIncrement = require('mongoose-auto-increment');

module.exports = function () {
    let db = mongoose.connect(config.db, {useMongoClient: true });
    autoIncrement.initialize(db);
    require('../app/models/transaction');
    require('../app/models/card');
    require('../app/models/atm');
    return db;
};