const mongoose = require('mongoose');
const {
	OwnerShipError,
	DocumentNotFoundError,
	InvalidIdError,
	ExistingUserError,
} = require('./custom-errors');

export const validateOwnership = function (request, document) {
	const ownerId = document.owner._id || document.owner;

	if (!request.user._id.equals(ownerId)) {
		throw new OwnerShipError();
	} else {
		return document;
	}
};

export const validateDocExists = function (doc) {
	if (!doc) {
		throw new DocumentNotFoundError();
	} else {
		return doc;
	}
};

export const validateUserExists = function (user) {
	if (user) {
		throw new ExistingUserError();
	}
};

export const validateId = function (request, response, next) {
	const isValidId = mongoose.Types.ObjectId.isValid(request.params.id);

	if (!isValidId) {
		throw new InvalidIdError();
	} else {
		next();
	}
};

// Generic catch-all handler.
export const handleErrors = function (error, request, response, next) {
	const statusCode = error.statusCode || 500;

	const message = error.message || 'Internal Server Error';

	response.status(statusCode).send(message);
};

