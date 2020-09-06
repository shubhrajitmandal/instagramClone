import React, { useState } from "react";
import { Auth } from "../../firebase/config";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setLoggedIn, setUser } = props;

  const handleLogin = (e) => {
    e.preventDefault();

    Auth.signInWithEmailAndPassword(username, password)
      .then((res) => {
        console.log(res.user);
        setLoggedIn(true);
        setUser(res.user);
        props.history.push("/dashboard");
      })
      .catch((err) => console.log(err.code, err.message));
  };

  return (
    <form className="auth" onSubmit={(e) => handleLogin(e)}>
      <div className="form-group">
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="submit"
          value="Sign In"
          onClick={(e) => {
            handleLogin(e);
          }}
        />
      </div>
    </form>
  );
};

export default Login;
