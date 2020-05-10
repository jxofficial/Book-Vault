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
    likePost,
    deletePost
  } = props;


  const [postDetailsVisible, setPostDetailsVisible] = useState(false);

  const buttonText = postDetailsVisible ? 'Hide details' : 'View details';
  const showWhenVisible = { display: postDetailsVisible ? '' : 'none' };
  const togglePostDetailsVisible = () => setPostDetailsVisible(!postDetailsVisible);

  const onClickLike = () => likePost(post);
  const onClickDelete = () => deletePost(post);

  return (
    <div style={postStyle} className="content">
      {post.title} by {post.author}&nbsp;
      <button type="button" onClick={togglePostDetailsVisible}>{buttonText}</button>

      <div style={showWhenVisible} className="toggleable-content">
        <div>{post.url}</div>
        <div>
          {post.likes}&nbsp;
          <button type="button" onClick={onClickLike}>Like</button>
        </div>
        <div>Book saved by {post.user.name}</div>
        <button type="button" onClick={onClickDelete}>Delete post</button>
      </div>
    </div>
  );
};

export default BlogPost;
