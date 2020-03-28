import React from 'react'
const BlogPost = ({ post }) => (
  <div>
    {post.title} {post.author}
  </div>
)

export default BlogPost;
