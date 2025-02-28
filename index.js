const express = require("express");

const port = 8010;

const path = require('path');

const app = express();

const db = require("./config/mongoose");

const Adminctl = require("./models/Adminmodel");

const cookieParser = require('cookie-parser');

const passport = require('passport')

const session = require('express-session')

const passportlocal = require('passport-local')

const passportstratege = require('./config/passportstratege');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "assets")));

app.use(express.urlencoded());


app.use(session({
    name : 'test',
    secret : 'testkey',
    resave : false,
    saveuninitialized : false,
    Cookie :{
        maxage : 1000*60*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.SetAuthUser)


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/", require("./routes/adminroutes"));


//View Engine Data
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.listen(port, (err) => {
    if (err) {
        console.log("something is wrong");
        return false;
    }
    console.log("Sever is Running on port:- ", port);
})