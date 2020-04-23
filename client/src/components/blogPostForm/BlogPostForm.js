import React, { useState } from 'react';

const BlogPostForm = ({ createPost }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = e => setTitle(e.target.value);
  const handleAuthorChange = e => setAuthor(e.target.value);
  const handleUrlChange = e => setUrl(e.target.value);

  const submitForm = e => {
    e.preventDefault();
    const postObject = {
      title,
      author,
      url
    };

    createPost(postObject);

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>Create new post</h2>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <label htmlFor="url">Url: </label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">
          Create
        </button>
      </form>
    </>
  );
};

export default BlogPostForm;