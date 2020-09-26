import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/layout/Dashboard";
import PostForm from "./components/post/PostForm";
import UserProfile from "./components/profile/UserProfile";
import Profile from "./components/profile/Profile";
import EditProfileFrom from "./components/profile/EditProfileForm";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import { AuthState } from "./context/auth/AuthContext";
import "./App.css";

const App = () => {
  return (
    <AuthState>
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/dashboard/post" component={PostForm} />
            <ProtectedRoute
              exact
              path="/dashboard/profile"
              component={UserProfile}
            />
            <ProtectedRoute
              exact
              path="/dashboard/profile/edit"
              component={EditProfileFrom}
            />
            <Route
              exact
              path="/dashboard/profile/:username"
              component={Profile}
            />
          </Switch>
        </div>
      </Router>
    </AuthState>
  );
};

export default App;
