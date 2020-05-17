import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Notification({ message, type }) {
  const classes = useStyles();
  if (!message) {
    return null;
  }

  if (type === 'error') {
    return (
      <div className={classes.root}>
        <Alert severity="error">{message}</Alert>
      </div>
    );
  }

  if (type === 'success') {
    return (
      <div className={classes.root}>
        <Alert severity="success">{message}</Alert>
      </div>
    );
  }
}