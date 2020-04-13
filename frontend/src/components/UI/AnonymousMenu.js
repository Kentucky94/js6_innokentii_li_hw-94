import React, {Fragment} from 'react';
import {NavLink as RouterNavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

const AnonymousMenu = () => {
  return (
    <Fragment>
      <Button component={RouterNavLink} color='inherit' to="/register" exact>Sign Up</Button>
      <Button component={RouterNavLink} color='inherit' to="/login" exact>Login</Button>
    </Fragment>
  );
};

export default AnonymousMenu;