import React from "react";

const Dashboard = () => {
  const handleLogout = () => {};

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
