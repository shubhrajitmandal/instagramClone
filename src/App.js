import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/layout/Dashboard";
import { Auth } from "./firebase/config";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);

    Auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUser(user);
        console.log("loggedIn");
      } else {
        setLoggedIn(false);
        setUser(null);
        console.log("not logged in");
      }
    });

    setLoading(false);
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Login
                {...props}
                setLoggedIn={setLoggedIn}
                setUser={setUser}
                setLoading={setLoading}
                loading={loading}
              />
            )}
          />
          <Route exact path="/dashboard">
            {loggedIn ? <Dashboard loading={loading} /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
