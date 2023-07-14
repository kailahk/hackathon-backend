const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const strategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
};

const strategy = new Strategy(strategyOptions, (jwt_payload, done) => {
	User.findById(jwt_payload.id)
		.then((user) => done(null, user))
		.catch((error) => done(error));
});

passport.use(strategy);
passport.initialize();

module.exports = passport;