const blogPostsRouter = require('express').Router();
const BlogPost = require('../models/blogPost');

blogPostsRouter.get('/blogposts', async (req, resp) =>  {
  const documents = await BlogPost.find({});
  const parsedPosts = documents.map(doc => doc.toJSON());
  return resp.json(parsedPosts);
});

blogPostsRouter.post('/blog', (req, resp) => {
  const body = req.body;
  
  const blogPost = new BlogPost({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  });

  blogPost
    .save()
    .then(result => resp.status(201).json(result.toJSON()));
});

module.exports = blogPostsRouter; 