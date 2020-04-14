import React, {Component, Fragment} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import {loginUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitFormHandler = event => {
    event.preventDefault();

    this.props.loginUser({...this.state});
  };

  render() {
    return (
      <Fragment>
        <Grid container justify='center'>
          <Grid item xs={12} md={10} lg={4}>
            <Box py={2}>
              <Typography variant='h3'>
                Login
              </Typography>
            </Box>

            <form onSubmit={this.submitFormHandler}>
              <Grid container direction='column' spacing={2}>
                <Grid item xs>
                  <FormElement
                    propertyName='username'
                    title='Username'
                    value={this.props.username}
                    onChange={this.inputChangeHandler}
                    type="text"
                    autoComplete="current-username"
                    placeholder="Enter username"
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                    propertyName='password'
                    title='Password'
                    value={this.props.password}
                    onChange={this.inputChangeHandler}
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter password"
                  />
                </Grid>
                <Grid item xs>
                  <Button type="submit" color="primary" variant='contained'>
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData))
});

export default connect(null, mapDispatchToProps)(Login);