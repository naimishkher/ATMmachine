/*jslint es6 */
/*jslint node: true */
"use strict";

const Transaction = require('mongoose').model('Transaction');
const Card = require('mongoose').model('Card');
const Atm = require('mongoose').model('Atm');

exports.isCardValid = function (req, res) {
    let card_number = req.body.card_number;
    let pin = req.body.password;

    Card.findOne({'card_number': card_number, 'pin': pin}, function (err, cardDetail) {
        if (err) {
            res.json({
                success: false,
                message: 'Please try again later'
            });
        } else if (!cardDetail) {
            res.json({
                success: false,
                message: 'Please insert valid data'
            });
        } else {
            res.json({
                success: true,
                message: 'Congrats!',
                cardDetail: cardDetail
            });
        }
    });
};

exports.transactionDetail = function (req, res) {
    Transaction.find({}, function (err, transactionDetail) {
        if (err) {
            res.json({
                success: false,
                message: 'Please try again later'
            });
        } else {
            res.json({
                success: true,
                transactionDetail: transactionDetail
            });
        }
    }).sort({_id: -1});
};

exports.isEnoughBalance = function (req, res) {
    let withdraw_notes = [];
    let card_id = req.body.card_id;
    let debited_balance = +(req.body.withDrawAmount);
    let remaining_balance = debited_balance;
    Card.findById(card_id, function (err, cardDetail) {
        if (err) {
            res.json({
                success: false,
                message: 'Please try again later'
            });
        } else if (!cardDetail) {
            res.json({
                success: false,
                message: 'Please insert valid detail'
            });
        } else {
            let available_balance = +(cardDetail.balance);
            if (debited_balance > available_balance) {
                res.json({
                    success: false,
                    message: 'Oops! You have insufficient balance'
                });
            } else {
                if ((debited_balance / 100) > parseInt(debited_balance / 100)) {
                    res.json({
                        success: false,
                        message: 'Please enter amount multiple of 100'
                    });
                } else {
                    Atm.findOne({}, function (err, denominationDetail) {
                        let note_detail = denominationDetail.note_detail;
                        if (err) {
                            res.json({
                                success: false,
                                message: 'Please Try again Later'
                            });
                        } else {
                            note_detail.forEach((item) => {
                                if (item.count > 0) {
                                    let single_note = parseInt(remaining_balance / item.note);
                                    if (single_note > item.count) {
                                        single_note = item.count;
                                        remaining_balance = remaining_balance - (single_note * item.note);
                                        withdraw_notes.push({note: item.note, count: single_note});
                                    } else {
                                        remaining_balance = remaining_balance - (single_note * item.note);
                                        withdraw_notes.push({note: item.note, count: single_note});
                                    }
                                }
                            });

                            let total = 0;
                            withdraw_notes.forEach((data) => {
                                total = total + (data.note * data.count);
                            });

                            if (total !== debited_balance) {
                                res.json({
                                    success: false,
                                    message: 'Please try with other amount'
                                });
                            } else {
                                let availableBalanceWhenDebited = +(cardDetail.balance) - +(debited_balance);
                                let transaction = new Transaction({
                                    debitAmount: debited_balance,
                                    availableBalanceWhenDebited: availableBalanceWhenDebited,
                                    transactionDetail: withdraw_notes
                                });

                                transaction.save(function (err) {
                                    if (err) {
                                        res.json({
                                            success: false,
                                            message: 'Please Try again Later'
                                        });
                                    } else {
                                        let temp = [];
                                        note_detail.forEach((note_detail, noteDetalIndex) => {
                                            let availableCount = note_detail.count;
                                            withdraw_notes.forEach((withdraw_notes, withdrawIndex) => {
                                                if (noteDetalIndex === withdrawIndex) {
                                                    let withDrawCount = withdraw_notes.count;
                                                    let deductCount = availableCount - withDrawCount;
                                                    temp.push({note: withdraw_notes.note, count: deductCount});
                                                }
                                            });
                                            let index = ((denominationDetail.note_detail).length);
                                            if (index == (noteDetalIndex + 1)) {
                                                Atm.findOneAndUpdate({}, {note_detail: temp}, function (err, updatedData) {
                                                    if (err) {
                                                        res.json({
                                                            success: false,
                                                            message: 'Please Try again later'
                                                        });
                                                    } else {
                                                        Card.findByIdAndUpdate(card_id, {balance: availableBalanceWhenDebited}, function (err, updatedCardDetail) {
                                                            if (err) {
                                                                res.json({
                                                                    success: false,
                                                                    message: 'Please Try again later'
                                                                });
                                                            } else {
                                                                res.json({
                                                                    success: true,
                                                                    withdraw_notes: withdraw_notes,
                                                                    debitAmount: debited_balance,
                                                                    availableBalanceWhenDebited: availableBalanceWhenDebited
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            }
        }
    });
};