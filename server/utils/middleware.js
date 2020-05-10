const logger = require('./logger');

const requestLogger = (req, resp, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:', req.path);
  logger.info('Body:', req.body);
  logger.info('---');
  next();
};

const tokenExtractor = (req, resp, next) => {
  const authorizationStr = req.get('Authorization');
  if (authorizationStr && authorizationStr.toLowerCase().startsWith('bearer ')) {
    req.body.token = authorizationStr.substring(7);
  } else {
    req.body.token = null;
  }
  next();
}

const errorHandler = (err, req, resp, next) => {
  logger.error(err.message);
  next(); 
}

module.exports = {
  requestLogger,
  tokenExtractor,
  errorHandler
}