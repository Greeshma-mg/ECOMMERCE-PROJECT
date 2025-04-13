import React, { useState } from 'react';
import '../assets/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login submitted with:', { email, password });

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
      console.log('Server response:', data);

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        
        // Verify the token immediately to ensure it's valid
        try {
          const verifyRes = await fetch('https://ecommerce-backend-lty1.onrender.com/api/auth/verify', {
            headers: {
              'Authorization': `Bearer ${data.token}`
            }
          });
          
          if (verifyRes.ok) {
            alert('Login successful!');
            window.location.href = '/';
          } else {
            setErrorMessage('Authentication failed. Please try again.');
            localStorage.removeItem('token');
          }
        } catch (verifyError) {
          console.error('Verification error:', verifyError);
          setErrorMessage('Authentication verification failed. Please try again.');
          localStorage.removeItem('token');
        }
      } else {
        setErrorMessage(data.msg || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Network/login error:', error);
      setErrorMessage('Server unreachable. Please try again later.');
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

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default Login;