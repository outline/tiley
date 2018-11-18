function errorHandlingMiddleware(err, req, res, next) {
  const code = err.code || 'unknown';
  const status = err.status || 500;
  const message = err.message || 'An unknown error occurred';

  res.status(status);
  res.json({ code, message });
}

module.exports = errorHandlingMiddleware;
