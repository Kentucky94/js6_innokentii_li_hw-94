import React, {Component, Fragment} from 'react';
import {editUserProfile} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

class Register extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
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

    this.props.editUser(formData);
  };

  render() {
    return (
      <Fragment>
        <Grid container justify='center'>
          <Grid item xs={12} md={10} lg={4}>
            <Box py={2}>
              <Typography variant='h3'>Edit profile</Typography>
            </Box>

            <form onSubmit={this.submitFormHandler}>
              <Grid container spacing={2} direction='column'>
                <Grid item xs>
                  <FormElement
                    propertyName="oldPassword"
                    title="Old Password"
                    type="password"
                    value={this.state.oldPassword}
                    onChange={this.inputChangeHandler}
                    placeholder="Enter Old Password"
                    required={this.state.newPassword}
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                    propertyName="newPassword"
                    title="New Password"
                    type="password"
                    value={this.state.newPassword}
                    onChange={this.inputChangeHandler}
                    placeholder="Enter New Password"
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
                  <img style={{maxWidth: '100px'}} src={'http://localhost:8080/avatars/' + this.props.user.avatar} alt="oldImage"/>
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
                    Save changes
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

const mapStateToProps = state => ({
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  editUser: userData => dispatch(editUserProfile(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);