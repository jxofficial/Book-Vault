
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogPostsRouter = require('./controllers/blogPosts');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middlewares = require('./utils/middleware');

console.log('Connecting to MongoDB ---');

mongoose
  .connect(config.MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: false 
  })
  .then(() => console.log('Connection successful'))
  .catch(err => console.log('Connection error', err.message));

app.use(cors());
app.use(bodyParser.json());
app.use(middlewares.requestLogger);
app.use(middlewares.tokenExtractor);

app.use('/api/', blogPostsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app; 
