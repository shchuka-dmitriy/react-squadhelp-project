export class ApplicationError extends Error {
  constructor (message, status) {
    super();

    Error.captureStackTrace( this, this.constructor );

    this.name = this.constructor.name;

    this.message = message ||
                   'Something went wrong. Please try again.';

    this.status = status || 500;

  }
}

export class AuthorizationError extends ApplicationError {
  constructor (message) {
    super( message || 'The request requires user authentication.', 401 );
  }
}

export class BadRequestError extends ApplicationError {
  constructor (message) {
    super( message || 'The request could not be understood by the server due to malformed syntax.', 400 );
  }
}

export class ForbiddenError extends ApplicationError {
  constructor (message) {
    super( message || 'The server understood the request, but is refusing to fulfill it.', 403 );
  }
}

export class ResourceNotFoundError extends ApplicationError {
  constructor (resource = 'resource') {
    super( `Error 404: ${resource} not found.`, 404 );
  }
}

export class AuthenticationTimeoutError extends ApplicationError {
  constructor (message) {
    super( message || 'Access token is missing or expired', 419 );
  }
}