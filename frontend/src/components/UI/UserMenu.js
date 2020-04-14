import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const UserMenu = ({user, logout}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <IconButton color='inherit' >
        <PersonAddIcon />
      </IconButton>

      <IconButton color='inherit' component={Link} to='/posts/add'>
        <AddIcon />
      </IconButton>

      <IconButton color='inherit' onClick={handleClick}>
        <AccountCircleOutlinedIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        <ListItem disabled>
          Hello, {user.displayName}!
        </ListItem>
        <Divider/>
        <MenuItem onClick={handleClose} component={Link} to='/users/edit'>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </Fragment>
  );
};
export default UserMenu;