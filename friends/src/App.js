import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Friends</h1>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </header>
        <Switch>

          <Route path="/login" component={Login} />
        </Switch>
      </div>      
    </Router>
  );
}

export default App;
