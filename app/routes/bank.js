/*jslint es6 */
/*jslint node: true */
"use strict";

var bank = require('../controllers/bank');

module.exports = function (app) {
    app.route('/isCardValid').post(bank.isCardValid);
    app.route('/isEnoughBalance').post(bank.isEnoughBalance);
    app.route('/transactionDetail').get(bank.transactionDetail);
};
