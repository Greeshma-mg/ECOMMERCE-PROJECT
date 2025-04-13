import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        // Make an API call to verify the token
        const response = await fetch('https://ecommerce-backend-lty1.onrender.com/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // Invalid token, remove it
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem("token");
      }
      
      setLoading(false);
    };
    
    verifyToken();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;