import React from 'react';
import { Link } from "react-router-dom";
import {resetLocalStorage} from "../utils/resetLocalStorage";

export default function Login({ isLoggedIn, setIsLoggedIn }) {
    const logout = e => {
        e.preventDefault();
        resetLocalStorage();
        setIsLoggedIn(false);
    }

    return (
        <div className="navigation">
            {isLoggedIn ? <button className="nav-link" onClick={logout}>Logout</button> : <Link to="/login">Login</Link> }
            <Link className='list-link' to="/protected">Friends List</Link>
        </div>
    );
}