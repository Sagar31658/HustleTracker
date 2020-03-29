const express = require("express");
const router = express.Router();

const ExpenseController = require("../controllers/ExpenseController");
const isAuth = require("../controllers/isAuth");

router.get("/dashboard", isAuth, ExpenseController.getDashboardPage);

router.post("/addExpense", isAuth, ExpenseController.postaddExpensePage);

router.get("/editExpense/:id", isAuth, ExpenseController.getEditExpensePage);

router.post("/editExpense/:id", isAuth, ExpenseController.postEditExpense);

router.get("/deleteExpense/:id", isAuth, ExpenseController.DeleteExpense);

module.exports = router;
