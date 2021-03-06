const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const Expense = require("../models/Expense");
const User = require("../models/User");

exports.getDashboardPage = (req, res) => {
    let today = new Date();
    let y = today.getFullYear();
    let m = today.getMonth() + 1;
    let d = today.getDate();
    let date = y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);

    Expense.find({
        admin: req.session.user._id
    })
        .then(expenses => {
            res.render("dashboard.ejs", {
                Expenses: expenses,
                Date: date
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getaddExpensePage = (req, res) => {
    res.render("dashboard.ejs");
};

exports.postaddExpensePage = (req, res) => {
    const ExpenseType = req.body.ExpenseType;
    const Amount = req.body.Amount;
    const Date = req.body.Date;

    const expense = new Expense({
        ExpenseType: ExpenseType,
        Amount: Amount,
        Date: Date,
        admin: req.session.user._id
    })
        .save()
        .then(expense => {
            User.findById(req.session.user._id)
                .then(user => {
                    user.Expenses.push(expense);
                    console.log("Expense Added!");
                    res.redirect("/expense/dashboard");
                    return user.save();
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditExpensePage = (req, res) => {
    let today = new Date();
    let y = today.getFullYear();
    let m = today.getMonth() + 1;
    let d = today.getDate();
    let date = y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);

    Expense.findOne({
        _id: req.params.id
    })
        .then(expenses => {
            res.render("edit.ejs", {
                Expenses: expenses,
                Date: date
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postEditExpense = (req, res) => {
    const id = req.params.id;
    const ExpenseType = req.body.ExpenseType;
    const Amount = req.body.Amount;
    const Date = req.body.Date;

    Expense.findByIdAndUpdate(
        id,
        {
            ExpenseType: ExpenseType,
            Amount: Amount,
            Date: Date
        },
        { new: true }
    )
        .then(expense => {
            console.log("Expense Updated!");
            res.redirect("/expense/dashboard");
        })
        .catch(err => {
            console.log(err);
        });
};

exports.DeleteExpense = (req, res) => {
    const id = req.params.id;

    Expense.findByIdAndDelete(id)
        .then(expense => {
            User.findById(req.session.user._id)
                .then(user => {
                    const index = user.Expenses.indexOf(id);
                    if (index > -1) {
                        user.Expenses.splice(index, 1);
                    }
                    console.log(user.Expenses);
                    console.log("expense deleted!");
                    res.redirect("/expense/dashboard");
                    return user.save();
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};
