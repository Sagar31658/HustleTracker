const mongoose = require("mongoose");

const Expense = require("./Expense");

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
    FName: {
        type: String
    },
    LName: {
        type: String
    },
    UserName: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        unique: true
    },
    Expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expense"
        }
    ]
});

module.exports = mongoose.model("User", UserSchema);
