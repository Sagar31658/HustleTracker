const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

const isAuth = require('../controllers/isAuth');

router.get('/signup', UserController.getSignupPage);

router.post('/signup', UserController.postSignupPage);

router.get('/login', UserController.getLoginPage);

router.post('/login', UserController.postLoginPage);

router.get('/logout', UserController.getLogout);

module.exports = router;