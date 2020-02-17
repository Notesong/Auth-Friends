import React from 'react';
import { Link } from "react-router-dom";

export default function Login({ isLoggedIn, loggedInUsername }) {

  return (
    <div className="home">
        {isLoggedIn ? (
            <>
                <h2>Welcome back, {loggedInUsername}!</h2>
            </>
        ) : (
            <>
                <h2>Welcome!</h2>
                <h3>Please <Link to="/login" className="on-component-link">login</Link> to see your Friends.</h3>
            </>
        )}
        
    </div>
  );
}