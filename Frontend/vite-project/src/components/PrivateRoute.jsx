import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("PrivateRoute check. Token:", token); // ✅ Check if token is found
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
