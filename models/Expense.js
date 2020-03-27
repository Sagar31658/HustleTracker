const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ExpenseSchema = mongoose.Schema({
    ExpenseType: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Date: {
        type: Date
        // required:true
    },
});

module.exports = mongoose.model('Expense', ExpenseSchema);