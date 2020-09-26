import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

const Loader = () => {
  const [percentage, setPercentage] = useState(0);
  const { progress, setProgress } = useContext(AuthContext);

  useEffect(() => {
    setPercentage(progress);
  }, [progress, setProgress]);

  return (
    <div
      className="loader"
      style={{ width: percentage + "%", height: "2px", background: "#0088ff" }}
    />
  );
};

export default Loader;
