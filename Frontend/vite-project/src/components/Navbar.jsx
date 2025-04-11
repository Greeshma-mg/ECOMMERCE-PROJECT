
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          GlowStore
        </Link>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/category/SkinCare">Skin Care</Link></li>
          <li><Link to="/category/HairCare">Hair Care</Link></li>
          <li><Link to="/category/BabyCare">Baby Care</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
