class OwnerShipError extends Error {
	constructor() {
		super();
		this.name = 'OwnershipError';
		this.statusCode = 401;
		this.message = 'The provided token does not match the owner of this document';
	}
}

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
		this.message = 'The provided email is already taken';
	}
}

// Generic catch-all handler.
const handleErrors = function (error, request, response, next) {
  const statusCode = error.statusCode || 500;

  const message = error.message || 'Internal Server Error';

  response.status(statusCode).send(message);
};

module.exports = {
  OwnerShipError,
  DocumentNotFoundError,
  BadParamsError,
  BadCredentialsError,
  InvalidIdError,
  ExistingUserError,
  handleErrors,
};
