import React, {Component, Fragment} from 'react';
import {registerUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

class Register extends Component {
  state = {
    username: '',
    password: '',
    displayName: '',
    avatar: '',
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  fileChangeHandler = event => {
    this.setState({[event.target.name]: event.target.files[0]})
  };

  submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      const value = this.state[key];

      formData.append(key, value);
    });

    this.props.registerUser(formData);
  };

  render() {
    return (
      <Fragment>
        <Grid container justify='center'>
          <Grid item xs={12} md={10} lg={4}>
            <Box py={2}>
              <Typography variant='h3'>Register new user</Typography>
            </Box>

            <form onSubmit={this.submitFormHandler}>
              <Grid container spacing={2} direction='column'>
                <Grid item xs>
                  <FormElement
                    propertyName="username"
                    title="Username"
                    type="text"
                    value={this.state.username}
                    onChange={this.inputChangeHandler}
                    placeholder="Enter Username"
                    autoComplete="new-username"
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                    propertyName="password"
                    title="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.inputChangeHandler}
                    placeholder="Enter Password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                    propertyName="displayName"
                    title="Display Name"
                    type="text"
                    value={this.state.displayName}
                    onChange={this.inputChangeHandler}
                    placeholder="Enter display name"
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                    propertyName="avatar"
                    title="Avatar Image"
                    type="file"
                    onChange={this.fileChangeHandler}
                  />
                </Grid>
                <Grid item xs>
                  <Button type="submit" color="primary">
                    Register
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
  registerUser: userData => dispatch(registerUser(userData))
});

export default connect(null, mapDispatchToProps)(Register);