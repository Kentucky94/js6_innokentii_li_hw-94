import React from 'react';
import {Link} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../../store/actions/usersActions";
import UserMenu from "../UserMenu";
import AnonymousMenu from "../AnonymousMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'inherit',
    textDecoration: 'none',
  },
}));

const MainAppBar = () => {
  const classes = useStyles();
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} component={Link} to='/'>
            SocialApp
          </Typography>
          {user ? (
            <UserMenu user={user} logout={() => dispatch(logoutUser())}/>
          ) : (
            <AnonymousMenu/>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainAppBar;