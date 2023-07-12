const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { validateUserExists } = require('../middleware/error-handlers');
const { createUserToken, getIdFromToken } = require('../middleware/auth');
require('dotenv').config();

router.post('/signup', (request, response, next) => {
	console.log(request.body);
	User.findOne({ email: request.body.email })
		.then(validateUserExists)
		.then(() => bcrypt.hash(request.body.password, 10))
		.then((hash) => ({
			name: request.body.name,
			email: request.body.email,
			password: hash,
		}))
		.then((userData) => User.create(userData))
		.then((userDoc) => response.status(201).json(userDoc))
		.catch(next);
});

// Send token to client or throw error.
router.post('/login', (request, response, next) => {
	console.log(request.body);
	User.findOne({ email: request.body.email })
		.then((user) => createUserToken(request, user))
		.then((token) => response.json({ token }))
		.catch(next);
});

router.get('/me', (request, response, next) => {
	User.findById(getIdFromToken(request))
		.then((user) => response.json(user))
		.catch(next);
});

module.exports = router;
