import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src="/picturesUSIU logo.jpg" alt="USIU Logo" style={{height: "60px"}} />
      </div>
      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {token && <Link to="/vote">Vote</Link>}
      </div>
      <div className="navbar-right">
        {token ? (
          <button onClick={handleLogout} style={{
            backgroundColor: '#aee6e6', color:'#0000cc', border:'none', padding:'8px 16px', borderRadius:'30px', fontWeight:'bold'
          }}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={{backgroundColor:'#aee6e6', color:'#0000cc', padding:'8px 16px', marginLeft:'10px', borderRadius:'30px', fontWeight:'bold'}}>Login</Link>
            <Link to="/register" style={{backgroundColor:'#aee6e6', color:'#0000cc', padding:'8px 16px', marginLeft:'10px', borderRadius:'30px', fontWeight:'bold'}}>Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;