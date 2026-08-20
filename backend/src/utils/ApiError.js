class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

module.exports = ApiError;