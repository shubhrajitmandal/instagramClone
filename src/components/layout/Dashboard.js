import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "../../firebase/config";
import Spinner from "./Spinner";

const Dashboard = ({ loading }) => {
  const history = useHistory();

  const handleLogout = () => {
    console.log("clicked");
    Auth.signOut();
    history.push("/dashboard");
  };

  return (
    <div className="dashboard">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1>Dashboard</h1>
          <button onClick={handleLogout}>Logout</button>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
