import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/layout/Dashboard";
import "./App.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(false);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Login {...props} setLoggedIn={setLoggedIn} setUser={setUser} />
            )}
          />
          <Route exact path="/dashboard">
            {loggedIn ? <Dashboard /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
