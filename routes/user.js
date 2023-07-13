const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { validateUserExists } = require('../middleware/validation');
const {
  requireToken,
  createUserToken,
  isTokenExpired,
  getIdFromToken,
} = require('../middleware/auth');
require('dotenv').config();

router.post('/signup', (request, response, next) => {
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

router.post('/login', (request, response, next) => {
  User.findOne({ email: request.body.email })
    .then((user) => createUserToken(request, user))
    .then((token) => response.status(201).json({ token }))
    .catch(next);
});

router.get('/me', requireToken, (request, response, next) => {
  if (isTokenExpired(request)) {
    return response.status(401).json({ message: 'Token expired' });
  }
  User.findById(getIdFromToken(request))
    .then((user) => response.status(200).json(user))
    .catch(next);
});

module.exports = router;
