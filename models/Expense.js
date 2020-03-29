const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const User = require("./User");

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
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Expense", ExpenseSchema);
