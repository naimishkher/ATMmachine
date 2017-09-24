/*jslint es6 */
/*jslint node: true */
"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var transaction = new Schema({
    debitAmount: Number,
    availableBalanceWhenDebited: Number,
    transactionDetail: [
        {
            note: Number,
            count: Number
        }
    ],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var Transaction = mongoose.model('Transaction', transaction);
module.exports = Transaction;

