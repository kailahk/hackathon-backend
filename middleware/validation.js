const mongoose = require('mongoose');
const {
  OwnerShipError,
  DocumentNotFoundError,
  InvalidIdError,
  ExistingUserError,
} = require('./custom-errors');

const validateOwnership = function (request, document) {
  const ownerId = document.owner._id || document.owner;

  if (!request.user._id.equals(ownerId)) {
    throw new OwnerShipError();
  } else {
    return document;
  }
};

const validateDocExists = function (doc) {
  if (!doc) {
    throw new DocumentNotFoundError();
  } else {
    return doc;
  }
};

const validateUserExists = function (user) {
  if (user) {
    throw new ExistingUserError();
  }
};

const validateId = function (request, response, next) {
  const isValidId = mongoose.Types.ObjectId.isValid(request.params.id);

  if (!isValidId) {
    throw new InvalidIdError();
  } else {
    next();
  }
};

module.exports = {
  validateOwnership,
  validateDocExists,
  validateUserExists,
  validateId,
};
