import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alert = () => {
  const { alertMsg } = useContext(AlertContext);

  return <div className="alert">{alertMsg}</div>;
};

export default Alert;
