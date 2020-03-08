
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogPostsRouter = require('./controllers/blogPosts');

console.log('Connecting to MongoDB ---');

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('Connection successful'))
  .catch(err => console.log('Connection error', err.message));

app.use(cors());
app.use(bodyParser.json());

app.use('/api/', blogPostsRouter);

module.exports = app; 
