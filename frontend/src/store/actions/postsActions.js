import axiosOrders from "../../axiosOrders";
import {push} from 'connected-react-router';

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';

export const createPostSuccess = () => ({type: CREATE_POST_SUCCESS});
export const fetchPostsSuccess = posts => ({type: FETCH_POSTS_SUCCESS, posts});
export const fetchTagsSuccess = tags => ({type: FETCH_TAGS_SUCCESS, tags});

export const createPost = postData => {
  return async dispatch => {
    try{
      await axiosOrders.post('/posts', postData);
      dispatch(createPostSuccess());
      dispatch(push('/'));
    }catch(error){
      console.log(error);
    }
  }
};

export const fetchPosts = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/posts');
      dispatch(fetchPostsSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const fetchTags = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('posts/tags');

      dispatch(fetchTagsSuccess(response.data));
    }catch(error){
      console.log(error)
    }
  }
};