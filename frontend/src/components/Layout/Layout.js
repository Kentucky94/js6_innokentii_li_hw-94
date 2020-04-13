import React, {Fragment} from 'react';
import MainAppBar from "../UI/Appbar/Appbar";

const Layout = props => {
  return (
    <Fragment>
      <MainAppBar />
      {props.children}
    </Fragment>
  );
};

export default Layout;