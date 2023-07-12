const mongoose = require('mongoose');

/* ===== Errors ===== */

// Occurs when a user manually goes to an endpoint where they don't have ownership of the data.
class OwnderShipError extends Error {
	constructor() {
		super();
		this.name = 'OwnershipError';
		this.statusCode = 401;
		this.message = 'The provided token does not match the owner of this document';
	}
}

// Occurs when the ID isn't found in the database.
class DocumentNotFoundError extends Error {
	constructor() {
		super();
		this.name = 'DocumentNotFoundError';
		this.statusCode = 404;
		this.message = "The provided ID doesn't match any documents";
	}
}

// Occurs when a partial request is sent from the client.
class BadParamsError extends Error {
	constructor() {
		super();
		this.name = 'BadParamsError';
		this.statusCode = 422;
		this.message = 'A required parameter was omitted or invalid';
	}
}

// Occurs on a bad login attempt.
class BadCredentialsError extends Error {
	constructor() {
		super();
		this.name = 'BadCredentialsError';
		this.statusCode = 422;
		this.message = 'The credentials provided are not incorrect';
	}
}

// Occurs when user manually goes to an endpoint that doesn't exist.
class InvalidIdError extends Error {
	constructor() {
		super();
		this.name = 'InvalidIdError';
		this.statusCode = 422;
		this.message = 'Invalid id';
	}
}

class ExistingUserError extends Error {
	constructor() {
		super();
		this.name = 'ExistingUserError';
		this.statusCode = 422;
		this.message = 'The provided username or email is already taken';
	}
}

/* ===== Validations ===== */

const validateOwnership = function (request, document) {
	// Dynamically chooses between parent or child reference.
	const ownerId = document.owner._id || document.owner;

	// Check if the current user is also the owner of the document.
	if (!request.user._id.equals(ownerId)) {
		throw new OwnderShipError();
	} else {
		return document;
	}
};

const validateRecordExists = function (record) {
	if (!record) {
		throw new DocumentNotFoundError();
	} else {
		return record;
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

// Generic catch-all handler.
const handleErrors = function (error, request, response, next) {
	const statusCode = error.statusCode || 500;

	const message = error.message || 'Internal Server Error';

	response.status(statusCode).send(message);
};

module.exports = {
	validateOwnership,
	validateRecordExists,
	validateUserExists,
	validateId,
	handleErrors,
};
