import React, { useState }from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navagation from "./components/Navagation";
import Home from "./components/Home";
import Login from './components/Login';
import FriendsList from './components/FriendsList';
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn"));

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link className="title" to="/">Friends</Link>
          <div>
            <Navagation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </div>
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" render={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />} />
          <ProtectedRoute path="/protected" component={FriendsList} />
        </Switch>
      </div>      
    </Router>
  );
}

export default App;
