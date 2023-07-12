const express = require("express")
const path = require('path');
const favicon = require('serve-favicon');
var logger = require('morgan');
const cors = require("cors")
var cookieParser = require('cookie-parser');
var session = require('express-session');
const passport = require('passport');
require("dotenv").config();
require("./config/db.connection");
require('./config/passport');

const app = express();

app.use(logger('dev'));
app.use(express.json());

// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// app.use(require('./config/checkToken'))

app.use(cors())


app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.send("Hello World");
});

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));