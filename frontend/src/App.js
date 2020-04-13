import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";

import Layout from "./components/Layout/Layout";
import PostsPage from "./containers/PostsPage/PostsPage";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import EditProfile from "./containers/EditProfile/EditProfile";
import AddPost from "./containers/AddPost/AddPost";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

const ProtectedRoute = ({isAllowed, ...props}) => (
  isAllowed ? <Route {...props} /> : <Redirect to='/register' />
);

const App = () => {
  const user = useSelector(state => state.users.user);

  return (
    <Layout>
      <CssBaseline />
      <Container>
        <Switch>
          <ProtectedRoute isAllowed={user} path='/' exact component={PostsPage} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <ProtectedRoute isAllowed={user} path='/users/edit' exact component={EditProfile} />
          <ProtectedRoute isAllowed={user} path='/posts/add' exact component={AddPost} />
        </Switch>
      </Container>
    </Layout>
  );
};

export default App;