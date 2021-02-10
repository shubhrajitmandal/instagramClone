import { GET_POSTS, CLEAR_POSTS } from "./types";

const PostReducer = (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
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
