import { GET_POSTS, CLEAR_POSTS, ADD_POST } from "./types";

const PostReducer = (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case ADD_POST:
      return {
        posts: [action.payload, ...state.posts],
      };

    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
      };

    default:
      return state;
  }
};

export default PostReducer;
