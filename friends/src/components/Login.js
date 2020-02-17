import React, { useState } from 'react';
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function Login({ isLoggedIn, setIsLoggedIn, setLoggedInUsername, history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, showLoader] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    
    setError('');
    showLoader(true);

    axiosWithAuth()
      .post("/login", { username: username, password: password })
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        history.push("/");
        setIsLoggedIn(true);
        setLoggedInUsername(username);
      })
      .catch(err => {
        setError('Incorrect username or password!');
        localStorage.removeItem("token");
        console.log("invalid login: ", err);
        showLoader(false);
        setUsername('');
        setPassword('');
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>Welcome {username}!</h1>
            <button onClick={() => setIsLoggedIn(false)}>Log Out</button>
          </>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {error && <p className="error">{error}</p>}
            <p>Login</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={e => setUsername(e.currentTarget.value)}
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={e => setPassword(e.currentTarget.value)}
            />
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}