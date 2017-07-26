function NotFoundError(message) {
  this.message = message || 'Not Found';
  var last_part = new Error().stack.match(/[^\s]+$/);
  this.stack = `${this.name} at ${last_part}`;
}

Object.setPrototypeOf(NotFoundError, Error);
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.name = 'NotFoundError';
NotFoundError.prototype.message = '';
NotFoundError.prototype.statusCode = 404;
NotFoundError.prototype.constructor = NotFoundError;

module.exports.NotFoundError = NotFoundError;
