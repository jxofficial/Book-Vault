const requestLogger = (req, resp, next) => {
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Body:', req.body);
  console.log('---');
  next();
};

const tokenExtractor = (req, resp, next) => {
  const authorizationStr = req.get('authorization');
  if (authorizationStr && authorizationStr.toLowerCase().startsWith('bearer ')) {
    req.body.token = authorizationStr.substring(7);
  } else {
    req.body.token = null;
  }
  next(); 
}

module.exports = {
  requestLogger,
  tokenExtractor
}