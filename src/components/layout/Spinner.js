import React from "react";
import Spinner_src from "../../assets/images/spinner2.gif";

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={Spinner_src} alt="Loading..." height="150" width="150" />
    </div>
  );
};

export default Spinner;
