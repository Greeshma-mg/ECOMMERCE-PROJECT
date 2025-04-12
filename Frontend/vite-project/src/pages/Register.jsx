import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link

function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = e => {
    e.preventDefault();
    console.log('Register:', formData);
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>

      <div className="login-link">
        <p>Already have an account? <Link to="/login">Login</Link></p> {/* Link to Login page */}
      </div>
    </div>
  );
}

export default Register;
