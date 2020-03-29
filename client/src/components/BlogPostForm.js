import React from 'react';

const BlogPostForm = (props) => {
  const {
    createPost,
    title,
    handleTitleChange,
    author,
    handleAuthorChange,
    url,
    handleUrlChange
  } = props; 
  
  return (
    <>
      <h2>Create new post</h2>
      <form onSubmit={createPost}>
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
  )
}

export default BlogPostForm;