/*jslint es6 */
/*jslint node: true */
"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var atm = new Schema({
    "note_detail": [
        {
            "note": Number,
            "count": Number
        }
    ]
});

var Atm = mongoose.model('Atm', atm);
module.exports = Atm;

