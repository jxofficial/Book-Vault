import React from 'react';
import BlogPost from './blogPost/BlogPost';

const BlogPostList = ({ blogPosts, likePost, deletePost }) => {
  return (
    <div>
      {
        blogPosts
          .map(post =>
            <BlogPost
              key={post.id}
              post={post}
              likePost={likePost}
              deletePost={deletePost}
            />
          )}
    </div>
  );
};

export default BlogPostList;