import React from 'react';
import { Link } from "react-router-dom";

export default function Login({ loggedInUsername }) {

  return (
    <div className="home">
        {localStorage.getItem("token") ? (
            <>
                <h2>Welcome back, {localStorage.getItem("username")}!</h2>
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