import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    margin: '1.5rem 0',
    backgroundColor: 'rgba(225, 232, 240, 0.25)'
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    margin: '.75rem',
    width: '8rem',
  },
}));

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;
  return (
    <Grid>
      <CardActionArea component="a" href={post.url} target="_blank">
        <Card className={classes.card}>
          <CardContent>
            <Typography component="h2" variant="h5" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              by {post.author}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            <Link href={post.url} target="_blank" variant="subtitle1">
              Continue reading...
            </Link>
          </CardContent>
          <CardMedia
            component='img'
            className={classes.cardMedia}
            src={post.bookImageUrl}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
