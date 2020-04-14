import React, {Component} from 'react';
import {fetchPosts} from "../../store/actions/postsActions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import MediaCard from "../../components/UI/MediaCard/MediaCard";
import {Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import moment from 'moment';

class PostsPage extends Component {
  async componentDidMount() {
    await this.props.fetchPosts();
  }

  render() {
    const postCards = this.props.posts.map(post =>
      <Grid item>
        <MediaCard
          image={'http://localhost:8080/uploads/' + post.image}
          username={!!post.user ? post.user.displayName : 'Anonymous'}
          date={moment(post.date).format('MMMM Do YYYY, h:mm:ss a')}
          text={post.text}
        />
      </Grid>
    );

    return (
      <Container fullWidth>
        {this.props.posts.length === 0 ?
          (<Typography variant='h4'>No posts are available</Typography>) :
          (<Grid container direction='row' justify='flex-start' xs={12} spacing={2}>
            {postCards}
          </Grid>
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);