/*jslint es6 */
/*jslint node: true */
"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var card = new Schema({
    card_number: String,
    pin: String,
    balance: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var Card = mongoose.model('Card', card);
module.exports = Card;

