import React from "react";

const ProgressBar = ({ percentage }) => {
  return (
    <div
      className="loader"
      style={{ width: percentage + "%", height: "3px", background: "#0088ff" }}
    />
  );
};

export default ProgressBar;
