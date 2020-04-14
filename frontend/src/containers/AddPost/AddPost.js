import React, {Component, Fragment} from 'react';
import {registerUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

class AddPost extends Component {
  state = {
    text: '',
    image: '',
    tags: [],
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
              <Typography variant='h3'>Add post</Typography>
            </Box>

            <form onSubmit={this.submitFormHandler}>
              <Grid container spacing={2} direction='column'>
                <Grid item xs>
                  <FormElement
                    propertyName="text"
                    title="Text"
                    type="text"
                    value={this.state.text}
                    onChange={this.inputChangeHandler}
                    placeholder="Post Text"
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                    propertyName="image"
                    title="Image"
                    type="file"
                    onChange={this.fileChangeHandler}
                  />
                </Grid>
                {/*<Grid item xs>*/}
                {/*  <FormElement*/}
                {/*    propertyName="avatar"*/}
                {/*    title="Avatar Image"*/}
                {/*    type="tags"*/}
                {/*    onChange={(e, value) => this.tagsChangeHandler(e, value)}*/}
                {/*    */}
                {/*  />*/}
                {/*</Grid>*/}
                <Grid item xs>
                  <Button type="submit" color="primary">
                    Add post
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
  registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);