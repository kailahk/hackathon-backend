const express = require("express")
const cors = require("cors")
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
// const passport = require('passport');
// const passport = require('./config/passport');
const { handleErrors } = require('./middleware/error-handlers');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// Converts json strings to an object for the request.
app.use(express.json());

require('dotenv').config();
require('./config/db.connection');
require('./config/passport');

// app.use(cookieParser());

// app.use(
// 	session({
// 		secret: process.env.SECRET,
// 		resave: false,
// 		saveUninitialized: true,
// 	})
// );

// app.use(passport.initialize());
// app.use(passport.session());
app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use('/users', require('./routes/user'));

app.use(handleErrors);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));