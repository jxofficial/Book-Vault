import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ListItem,
  Button,
  Typography,
} from '@material-ui/core';

import {
  ExpandMore,
  ThumbUp,
  Delete
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: '1.25rem'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  details: {
    flexDirection: 'column'
  },
  marginRight: {
    marginRight: '1rem'
  },
  marginBottom: {
    marginBottom: '1.5rem'
  }
}));


const BlogPost = (props) => {

  const classes = useStyles();

  const {
    post,
    likePost,
    deletePost
  } = props;


  const onClickLike = () => likePost(post);
  const onClickDelete = () => deletePost(post);

  return (
    <>
      <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle2">
            {`${post.title} by ${post.author}`}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography variant="subtitle2" gutterBottom>
            Description
            </Typography>

          <Typography variant="caption" className={classes.marginBottom}>
            {post.description}
          </Typography>

          <Typography variant="subtitle2" className={classes.marginBottom}>
            <span className={classes.marginRight}>{post.likes}</span>
            <Button className={classes.marginRight}
              size="small"
              color="primary"
              variant="contained"
              startIcon={<ThumbUp />}
              onClick={onClickLike}>
              Like
              </Button>

            <Button
              size="small"
              variant="contained"
              color="secondary"
              startIcon={<Delete />}
              onClick={onClickDelete}>
              Delete recommendation
              </Button>
          </Typography>

          <Typography variant="overline">
            Book recommended by {post.user.name}
          </Typography>

        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default BlogPost;


