const blogPostsRouter = require('express').Router();
const BlogPost = require('../models/blogPost');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogPostsRouter.get('/blogposts', async (req, resp, next) => {
  const documents = await BlogPost.find({}).populate('user', { username: 1, name: 1 });
  const parsedPosts = documents.map(doc => doc.toJSON());
  return resp.json(parsedPosts);
});

blogPostsRouter.get('/blogposts/:username', async (req, resp, next) => {
  const usernameInUrl = req.params.username;
  const token = req.body.token;
  if (!token) {
    return resp.status(401).json({ error: 'Token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
    if (decodedToken.username !== usernameInUrl) {
      return resp.status(401).json({
        error: `Authentication token does not match username in req url: 
        unable to retrieve ${usernameInUrl}'s posts`
      });
    }
  } catch (exception) {
    next(exception);
  }

  const user = await User.find({ username: usernameInUrl });
  const documents =
    await BlogPost
      .find({ user })
      .populate('user', {
        username: 1,
        name: 1
      });

  const parsedPosts = documents.map(doc => doc.toJSON());
  resp.json(parsedPosts);
});

blogPostsRouter.post('/blog', async (req, resp, next) => {
  const body = req.body;
  const token = body.token;
  if (!token) return resp.status(401).json({ error: 'Token missing' });
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
  } catch (exception) {
    next(exception);
  }

  const user = await User.findById(decodedToken.id);

  const blogPost = new BlogPost({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  });

  const result = await blogPost.save();
  user.blogPosts = user.blogPosts.concat(result);
  await user.save();
  resp.status(201).json(result.toJSON());
});

blogPostsRouter.delete('/blogposts/:id', async (req, resp, next) => {
  const blogPostId = req.params.id;
  let postToDelete;
  try {
    postToDelete = await BlogPost.findById(blogPostId);
  } catch (exception) {
    next(exception);
  }

  const token = req.body.token;
  if (!token) return resp.status(401).json({ error: 'Token missing' });

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
  } catch (exception) {
    next(exception);
  }

  if (postToDelete.user.toString() === decodedToken.id.toString()) {
    await BlogPost.findByIdAndDelete(blogPostId);
    resp.status(204).end();
  } else {
    resp.status(401).json({ error: 'Only user who posted the post can delete the post' });
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