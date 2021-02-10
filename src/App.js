import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/layout/Dashboard";
import PostForm from "./components/post/PostForm";
import UserProfile from "./components/profile/UserProfile";
import Profile from "./components/profile/Profile";
import EditProfileFrom from "./components/profile/EditProfileForm";
import PostView from "./components/post/PostView";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AuthState from "./context/auth/AuthState";
import PostState from "./context/post/PostState";
import AlertState from "./context/alert/AlertState";

import "./App.css";

const App = () => {
  return (
    <Router>
      <AlertState>
        <AuthState>
          <PostState>
            <div className="app">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <ProtectedRoute
                  exact
                  path="/dashboard/post"
                  component={PostForm}
                />
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
                <ProtectedRoute
                  exact
                  path="/dashboard/:postId"
                  component={PostView}
                />
              </Switch>
            </div>
          </PostState>
        </AuthState>
      </AlertState>
    </Router>
  );
};

export default App;
