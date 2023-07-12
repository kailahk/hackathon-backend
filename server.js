const express = require("express")
// const path = require('path');
// const favicon = require('serve-favicon');
const cors = require("cors")
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var session = require('express-session');
// const passport = require('passport');
// const passport = require('./config/passport');
const { handleErrors } = require('./middleware/error-handlers');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

require('dotenv').config();
require('./config/db.connection');
require('./config/passport');

const infoController = require("./controllers/info-controller")
app.use(cors())
app.use(express.json());
// var logger = require('morgan');
require("dotenv").config();
require("./config/db.connection");

app.use("/info", infoController);
app.get("/", (req, res) => {

    res.send("Hello World");
  });
  const path = require('path');
  // const favicon = require('serve-favicon');
  
  
  app.use(logger('dev'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// app.get('/*', function(req, res) {
//   res.redirect('/');
// });

app.use(handleErrors);

// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
// app.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));