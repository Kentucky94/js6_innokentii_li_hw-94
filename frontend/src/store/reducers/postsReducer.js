import {FETCH_POSTS_SUCCESS, FETCH_TAGS_SUCCESS} from "../actions/postsActions";

const initialState = {
  posts: [],
  tags: [],
};

const postsReducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_POSTS_SUCCESS:
      return {...state, posts: action.posts};
    case FETCH_TAGS_SUCCESS:
      return {...state, tags: action.tags};
    default:
      return state;
  }
};

export default postsReducer;