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
  tokenExtractor
}