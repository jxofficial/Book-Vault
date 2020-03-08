const blogPostsRouter = require('express').Router();
const BlogPost = require('../models/blogPost');

blogPostsRouter.get('/blogposts', (req, resp) =>  {
  BlogPost
    .find({})
    .then(posts => posts.map(post => post.toJSON()))
    .then(parsedPosts => resp.json(parsedPosts));
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