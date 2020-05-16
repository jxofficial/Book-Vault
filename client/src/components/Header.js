import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  }
}));

const Header = (props) => {
  const classes = useStyles();
  const { user, handleLogout } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {user.name}&apos;s Book Vault
        </Typography>
        <Button variant="outlined" size="small" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </React.Fragment>
  );
};

export default Header;