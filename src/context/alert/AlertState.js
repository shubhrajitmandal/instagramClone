import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT, CLEAR_ALERT } from "./types";

const AlertState = (props) => {
  const initialState = {
    alertMsg: "",
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg) => {
    dispatch({ type: SET_ALERT, msg: msg });
  };

  const clearAlert = () => {
    dispatch({ type: CLEAR_ALERT });
  };

  return (
    <AlertContext.Provider
      value={{ alertMsg: state.msg, setAlert, clearAlert }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
