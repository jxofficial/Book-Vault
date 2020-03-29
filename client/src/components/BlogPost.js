import React from 'react'
const BlogPost = ({ post }) => (
  <div>
    {post.title} by {post.author}
  </div>
)

export default BlogPost;
