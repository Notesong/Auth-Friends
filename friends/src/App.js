import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from './components/Login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const logout = e => {
    e.preventDefault();
    setIsLoggedIn(false);
    setLoggedInUsername('');
    localStorage.removeItem("token");
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Friends</h1>
          {isLoggedIn ? <button className="nav-link" onClick={logout}>Logout</button> : <Link to="/login">Login</Link> }
        </header>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} isLoggedIn={isLoggedIn} loggedInUsername={loggedInUsername} />} />
          <Route path="/login" render={(props) => <Login {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setLoggedInUsername={setLoggedInUsername} />} />
        </Switch>
      </div>      
    </Router>
  );
}

export default App;
