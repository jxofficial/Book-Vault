import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

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
      <Typography variant="h4" gutterBottom>
        Recommend a book
      </Typography>
      <Grid>
        <form onSubmit={submitForm}>
          <Grid>
            <TextField
              required
              name="title"
              label="Title"
              value={title}
              onChange={handleTitleChange}
              autoComplete="off"
            />
          </Grid>
          <TextField
            required
            name="author"
            label="Author"
            value={author}
            onChange={handleAuthorChange}
            autoComplete="off"
          />
          <Grid>
            <TextField
              name="url"
              label="Url"
              value={url}
              onChange={handleUrlChange}
              autoComplete="off"
            />
          </Grid>
        </form>
      </Grid>
      <Grid style={{ margin: '1rem 0' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
        >
          Save
      </Button>
      </Grid>
    </>
  );
};

export default BlogPostForm;