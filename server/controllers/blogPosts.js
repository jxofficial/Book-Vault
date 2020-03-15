const blogPostsRouter = require('express').Router();
const BlogPost = require('../models/blogPost');

blogPostsRouter.get('/blogposts', async (req, resp) => {
  const documents = await BlogPost.find({});
  const parsedPosts = documents.map(doc => doc.toJSON());
  return resp.json(parsedPosts);
});

blogPostsRouter.post('/blog', async (req, resp) => {
  const body = req.body;

  const blogPost = new BlogPost({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  });

  const result = await blogPost.save();
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

module.exports = blogPostsRouter; 