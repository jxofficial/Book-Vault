const blogPostsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const BlogPost = require('../models/blogPost');
const User = require('../models/user');
const goodReadsApiHandler = require('../utils/middleware').goodReadsApiHandler;

blogPostsRouter.get('/blogposts', async (req, resp, next) => {
  const documents = await BlogPost.find({}).populate('user', { username: 1, name: 1 });
  const parsedPosts = documents.map(doc => doc.toJSON());
  return resp.json(parsedPosts);
});

blogPostsRouter.get('/blogposts/:username', async (req, resp, next) => {
  const usernameInUrl = req.params.username;
  const userExists = await User.findOne({ username: usernameInUrl });
  if (!userExists) {
    return resp.status(404).json({ error: 'Username invalid, no posts shown' });
  }
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

blogPostsRouter.post('/blog', goodReadsApiHandler, async (req, resp, next) => {
  const body = req.body;
  const { goodReadsBook, token } = body;

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
    url: body.url || `https://www.goodreads.com/book/show/${goodReadsBook.bookId}`,
    likes: body.likes || 0,
    description: goodReadsBook.bookDescription,
    bookImageUrl: goodReadsBook.bookImageUrl,
    user: user._id
  });

  const result = await blogPost.save();

  BlogPost.populate(result, { path: 'user', select: 'username name' });
  user.blogPosts = user.blogPosts.concat(result);
  await user.save();

  resp.status(201).json(result.toJSON());
});

blogPostsRouter.delete('/blogposts/:id', async (req, resp, next) => {
  const token = req.body.token;
  const blogPostId = req.params.id;
  const postToDelete = await BlogPost.findById(blogPostId);

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
    likes: body.likes
  };

  try {
    const updatedDocument = await BlogPost
      .findByIdAndUpdate(id, updatedPost, { new: true })
      .populate('user', { username: 1, name: 1 });
    resp.json(updatedDocument.toJSON());
  } catch (exception) {
    next(exception);
  };
});

module.exports = blogPostsRouter; 