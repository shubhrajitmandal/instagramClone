import {
  GET_USER_SUCCESS,
  LOGOUT_SUCCESS,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
} from "./types";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        userProfile: action.userProfile,
        userPosts: action.userPosts,
        loading: false,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("auth-token");
      localStorage.removeItem("auth-user");
      return {
        user: {},
        userProfile: {},
        loading: true,
      };

    case SET_LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };

    case SET_LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
