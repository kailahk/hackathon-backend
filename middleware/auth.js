const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const jwtDecode = require('jwt-decode');

// NODE_ENV is a Heroku variable.
// This prevents dotenv throwing errors when deployed.
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const secret = process.env.JWT_SECRET;

/* ===== Passport Config ===== */

const strategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
};

const strategy = new Strategy(strategyOptions, (jwt_payload, done) => {
	User.findById(jwt_payload.id)
		.then((user) => done(null, user))
		.catch((error) => done(error));
});

// Register the strategy with passport to enable passport.authenticate() method.
passport.use(strategy);
passport.initialize();

/* ===== Token Config ===== */

// Authenticate method to use with routes.
const requireToken = passport.authenticate('jwt', { session: false });

function createUserToken(request, user) {
	// Validate user login.
	if (
		!user ||
		!request.body.password ||
		!bcrypt.compareSync(request.body.password, user.password)
	) {
		const error = new Error('The provided username or password is incorrect');
		error.statusCode = 422;
		throw error;
	}

	// If no error, create and return the token using user's id.
	return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 });
}

function getIdFromToken(request) {
	const token = request.headers.authorization.slice(7);

	if (!token) {
		const error = new Error('The credentials provided is incorrect');
		error.statusCode = 422;
		throw error;
	}

	return jwtDecode(token).id;
}

module.exports = { requireToken, createUserToken, getIdFromToken };
