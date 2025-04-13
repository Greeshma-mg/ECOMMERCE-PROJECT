// authUtils.js
export const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Redirect to login if no token
      window.location.href = '/login';
      return null;
    }
    
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    try {
      const response = await fetch(url, {
        ...options,
        headers
      });
      
      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        window.location.href = '/login';
        return null;
      }
      
      return response;
    } catch (error) {
      console.error('Request failed:', error);
      return null;
    }
  };