const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const credentials = require('./credentials/credentials');

const UserRoute = require('./routes/UserRoute');

const isAuth = require('./controllers/isAuth');

mongoose.Promise = global.Promise;

const app = express();

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

mongoose.connect(credentials.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('db is connected!')
}).catch(err => {
    console.log(err);
});

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/HustleTracker',
    collection: 'session'
});

app.use(session({
    secret: 'hey i am secret!',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use('/user', UserRoute);

app.get('/', isAuth, (req, res) => {
    res.send("We're all set!");
});

app.listen(3000, () => {
    console.log("server is running!");
});