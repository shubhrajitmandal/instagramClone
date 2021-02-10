import { CLEAR_ALERT, SET_ALERT } from "./types";

const AlertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        msg: action.msg,
      };

    case CLEAR_ALERT:
      return {
        ...state,
        msg: "",
      };

    default:
      return state;
  }
};

export default AlertReducer;
