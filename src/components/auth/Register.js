import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Alert from "../layout/Alert";
import AppLogo from "../../assets/images/Instagram_logo2.svg";
import Spinner from "../../assets/images/spinner3.gif";
import AuthContext from "../../context/auth/authContext2";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { googleAuth, createUserWithEmailAndPassword } = useContext(
    AuthContext
  );

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(email, password, name, username, setLoading);
  };

  const handleGoogleAuth = () => {
    setLoading(true);
    googleAuth(setLoading);
  };

  return (
    <div className="auth register">
      <form className="auth-form" onSubmit={(e) => handleRegister(e)}>
        <img src={AppLogo} alt="Instagram" className="auth-logo" />
        <h3>Sign up to see photos and videos from your friends.</h3>

        <Link to="#" className="google-link" onClick={handleGoogleAuth}>
          <FaGoogle className="google-icon" />
          Log in with Google
        </Link>

        <div className="google-auth">
          <div>
            <div className="bar"></div>
            OR
            <div className="bar"></div>
          </div>
        </div>

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
            type="text"
            value={name}
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
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
            onClick={(e) => handleRegister(e)}
            disabled={!(email && password && name && username)}
          >
            {loading ? (
              <img src={Spinner} alt="Spinner" height="20" width="20" />
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
        <Alert />
        <div className="singup-text">
          By signing up, you agree to our Terms , Data Policy and Cookies Policy
          .
        </div>
      </form>
      <div className="auth-login">
        Have an account?{" "}
        <Link to="/" className="signup-link">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Register;
