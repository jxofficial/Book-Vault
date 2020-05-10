const testRouter = require('express').Router();
const BlogPost = require('../models/blogPost');
const User = require('../models/user');


testRouter.post('/reset', async (req, resp) => {
  await BlogPost.deleteMany({});
  await User.deleteMany({});
  resp.status(204).end();
});

module.exports = testRouter;