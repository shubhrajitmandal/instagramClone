import React, { useEffect } from "react";

const Alert = ({ msg, setAlert }) => {
  useEffect(() => {
    // setTimeout(() => {
    //   setAlert("");
    // }, 5000);
  }, [setAlert]);
  return <div className="alert">{msg}</div>;
};

export default Alert;
