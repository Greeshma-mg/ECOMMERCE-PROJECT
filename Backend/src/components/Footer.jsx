import React from 'react';
import '../assets/Footer.css'; // Make sure to style it!

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section brand">
          <h2>GlowStore</h2>
          <p>Your one-stop shop for all things beauty and care.</p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/category/skincare">Skin Care</a></li>
            <li><a href="/category/haircare">Hair Care</a></li>
            <li><a href="/category/babycare">Baby Care</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: support@glowstore.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Kochi, Kerala, India</p>
        </div>

        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f" /></a>
            <a href="#"><i className="fab fa-instagram" /></a>
            <a href="#"><i className="fab fa-twitter" /></a>
            <a href="#"><i className="fab fa-youtube" /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GlowStore. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
