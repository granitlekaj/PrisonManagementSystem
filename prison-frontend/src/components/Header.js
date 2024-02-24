import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

const Header = ({ username, handleLogout }) => {
  return (
    <div className="header">
      <div className="header-left">
        <span className="username">User: {username}</span>
      </div>
      <div className="header-right">
        <Link className="profile" to="/profile">
          Profile
        </Link>
        <button className="logOutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;