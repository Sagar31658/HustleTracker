const express = require('express');
const router = express.Router();

const ExpenseController = require('../controllers/ExpenseController');
const isAuth = require('../controllers/isAuth');

router.get('/dashboard', isAuth, ExpenseController.getDashboardPage);

router.post('/addExpense', isAuth, ExpenseController.postaddExpensePage);

module.exports = router;