import React, { useState } from 'react';

const BlogPost = (props) => {
  const postStyle = {
    padding: '.5rem .5rem',
    border: 'solid',
    borderWidth: 1,
    marginBottom: '.75rem'
  };

  const {
    post,
    likePost
  } = props;

  
  const [postDetailsVisible, setPostDetailsVisible] = useState(false);

  const buttonText = postDetailsVisible ? 'Hide details' : 'View details';
  const showWhenVisible = { display: postDetailsVisible ? '' : 'none' };
  const togglePostDetailsVisible = () => setPostDetailsVisible(!postDetailsVisible);

  const onClickLike = () => likePost(post);

  return (
    <div style={postStyle}>
      {post.title} by {post.author}<span>&nbsp;</span>
      <span>
        <button type="button" onClick={togglePostDetailsVisible}>{buttonText}</button>
      </span>

      <div style={showWhenVisible}>
        <div>{post.url}</div>
        <div>
          {post.likes}<span>&nbsp;</span>
          <button type="button" onClick={onClickLike}>Like</button>
        </div>
        <div>Book saved by {post.user.name}</div>
      </div>
    </div>
  );
}

export default BlogPost;
