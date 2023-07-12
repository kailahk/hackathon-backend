export class OwnerShipError extends Error {
	constructor() {
		super();
		this.name = 'OwnershipError';
		this.statusCode = 401;
		this.message = 'The provided token does not match the owner of this document';
	}
}

export class DocumentNotFoundError extends Error {
	constructor() {
		super();
		this.name = 'DocumentNotFoundError';
		this.statusCode = 404;
		this.message = "The provided ID doesn't match any documents";
	}
}

// Occurs when a partial request is sent from the client.
export class BadParamsError extends Error {
	constructor() {
		super();
		this.name = 'BadParamsError';
		this.statusCode = 422;
		this.message = 'A required parameter was omitted or invalid';
	}
}

// Occurs on a bad login attempt.
export class BadCredentialsError extends Error {
	constructor() {
		super();
		this.name = 'BadCredentialsError';
		this.statusCode = 422;
		this.message = 'The credentials provided are not incorrect';
	}
}

// Occurs when user manually goes to an endpoint that doesn't exist.
export class InvalidIdError extends Error {
	constructor() {
		super();
		this.name = 'InvalidIdError';
		this.statusCode = 422;
		this.message = 'Invalid id';
	}
}

export class ExistingUserError extends Error {
	constructor() {
		super();
		this.name = 'ExistingUserError';
		this.statusCode = 422;
		this.message = 'The provided email is already taken';
	}
}
