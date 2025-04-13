import React, { useState } from 'react';
import '../assets/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('https://ecommerce-backend-lty1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log('Login response:', data); // ✅ Debugging info

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        window.location.href = '/'; // Redirect to homepage
      } else {
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Unable to connect to the server. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Error Message Display */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default Login;
