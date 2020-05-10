
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors');
const config = require('./utils/config');
const blogPostsRouter = require('./controllers/blogPosts');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const testRouter = require('./controllers/test');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

logger.info('Connecting to MongoDB ---');

mongoose
  .connect(config.MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: false 
  })
  .then(() => logger.info('Connection successful'))
  .catch(err => logger.info('Connection error', err.message));

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/', blogPostsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/test/', testRouter);
}

app.use(middleware.errorHandler);

module.exports = app; 
