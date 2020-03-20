const blogPostsRouter = require('express').Router();
const BlogPost = require('../models/blogPost');
const User = require('../models/user');

blogPostsRouter.get('/blogposts', async (req, resp) => {
  const documents = await BlogPost.find({}).populate('user', { username: 1, name: 1});
  const parsedPosts = documents.map(doc => doc.toJSON());
  return resp.json(parsedPosts);
});

blogPostsRouter.post('/blog', async (req, resp) => {
  const body = req.body;
  const user = await User.findOne(); // returns a random user document;

  const blogPost = new BlogPost({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });

  const result = await blogPost.save();
  user.blogPosts = user.blogPosts.concat(result);
  await user.save();
  resp.status(201).json(result.toJSON());
});

blogPostsRouter.delete('/blogposts/:id', async (req, resp, next) => {
  const id = req.params.id;
  try {
    await BlogPost.findByIdAndDelete(id);
    resp.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogPostsRouter.put('/blogposts/:id', async (req, resp, next) => {
  const body = req.body;
  const id = req.params.id;
  const updatedPost = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  try {
    const updatedDocument = await BlogPost.findByIdAndUpdate(id, updatedPost, { new: true })
    resp.json(updatedDocument.toJSON());
  } catch (exception) {
    next(exception);
  };
});

module.exports = blogPostsRouter; 