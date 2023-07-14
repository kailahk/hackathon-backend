const passport = require('../config/passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
const requireToken = passport.authenticate('jwt', { session: false });

function createUserToken(request, user) {
  if (
    !user ||
    !request.body.password ||
    !bcrypt.compareSync(request.body.password, user.password)
  ) {
    const error = new Error('Failed to create user token');
    error.statusCode = 422;
    throw error;
  }

  return jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });
}

function isTokenExpired(request) {
  const { exp } = jwtDecode(request.headers.authorization.slice(7));

  return Date.now() >= exp * 1000;
}

function getIdFromToken(request) {
  const token = request.headers.authorization.slice(7);

  if (!token) {
    const error = new Error('Failed to get ID from token');
    error.statusCode = 422;
    throw error;
  }

  return jwtDecode(token).id;
}

module.exports = { requireToken, createUserToken, isTokenExpired, getIdFromToken };
