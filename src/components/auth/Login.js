import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AppLogo from "../../assets/images/Instagram_logo2.svg";
import GoogleLogo from "../../assets/images/google.png";
import Alert from "../layout/Alert";
import Spinner from "../../assets/images/spinner3.gif";
import AuthContext from "../../context/auth/authContext2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginWithEmail, googleAuth } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    loginWithEmail(email, password, setLoading);
  };

  const handleGoogleAuth = () => {
    setLoading(true);
    googleAuth(setLoading);
  };

  return (
    <div className="auth">
      <form className="auth-form" onSubmit={(e) => handleLogin(e)}>
        <img src={AppLogo} alt="Instagram" className="auth-logo" />
        <div className="form-group">
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            min="6"
          />
        </div>
        <div className="form-group">
          <button
            className="submit"
            onClick={(e) => handleLogin(e)}
            disabled={!(email && password)}
          >
            {loading ? (
              <img src={Spinner} alt="Spinner" height="20" width="20" />
            ) : (
              "Log In"
            )}
          </button>
        </div>
        <Alert />
        <div className="google-auth">
          <div>
            <div className="bar"></div>
            OR
            <div className="bar"></div>
          </div>
          <Link to="#" className="google-link" onClick={handleGoogleAuth}>
            <img src={GoogleLogo} alt="Google" height="24" width="24" /> Log in
            with Google
          </Link>
          <Link to="#" className="password-link">
            Forgot password?
          </Link>
        </div>
      </form>
      <div className="auth-signup">
        Don't have an account?{" "}
        <Link to="/register" className="signup-link">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
