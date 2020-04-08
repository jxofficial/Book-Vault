import React from 'react';
import BlogPost from './BlogPost';

const BlogPostList = ({ blogPosts, likePost }) => {
  return (
    <div>
      {
        blogPosts
          .map(post =>
            <BlogPost key={post.id} post={post} likePost={likePost} />
          )}
    </div>
  );
};

export default BlogPostList;