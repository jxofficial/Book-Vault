const request = require('request-promise');
const parseStringPromise = require('xml2js').parseStringPromise;
const logger = require('./logger');

const requestLogger = (req, resp, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:', req.path);
  logger.info('Body:', req.body);
  logger.info('---');
  next();
};

const tokenExtractor = (req, resp, next) => {
  // req.headers.authorization
  const authorizationStr = req.get('Authorization');
  if (authorizationStr && authorizationStr.toLowerCase().startsWith('bearer ')) {
    req.body.token = authorizationStr.split(' ')[1];
  } else {
    req.body.token = null;
  }
  next();
};

const goodReadsApiHandler = async (req, resp, next) => {
  const searchTerm = encodeURIComponent(req.body.title);
  const xmlResult = await request.get(`https://www.goodreads.com/search/index.xml?key=YLoK3YpGpdLKZP3F9c9FWw&q=${searchTerm}`);
  const jsonResult = await parseStringPromise(xmlResult);
  const goodReadsBookId = jsonResult.GoodreadsResponse.search[0].results[0].work[0].best_book[0].id[0]._;
  
  const xmlResultBook = await request.get(`https://www.goodreads.com/book/show/${goodReadsBookId}.xml?key=YLoK3YpGpdLKZP3F9c9FWw`);

  const jsonResultBook = await parseStringPromise(xmlResultBook);
  let bookDescription = jsonResultBook.GoodreadsResponse.book[0].description[0];
  bookDescription = bookDescription.replace(/<br\s*\/?>/mg,'\n');
  bookDescription = bookDescription.replace(/(<([^>]+)>)/ig,'');
  const bookImageUrl = jsonResultBook.GoodreadsResponse.book[0].image_url[0];

  const goodReadsBook = {
    bookId: goodReadsBookId,
    bookDescription,
    bookImageUrl
  };

  req.body.goodReadsBook = goodReadsBook;
  next();
}

const errorHandler = (err, req, resp, next) => {
  logger.error(err.message);
  next(); 
};

module.exports = {
  requestLogger,
  tokenExtractor,
  goodReadsApiHandler,
  errorHandler
};