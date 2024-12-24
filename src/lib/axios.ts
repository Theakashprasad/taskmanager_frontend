import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_SERVER_URL,  // Environment variable for the base URL
  withCredentials: true,  // Allows credentials (cookies, auth headers) to be sent
});

// Request Interceptor: Attach Authorization Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');  // Assuming the token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Attach token to headers
      console.log('Authorization header:', config.headers.Authorization); // Log for debugging

    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Example: If Unauthorized, redirect to login
      console.error("Unauthorized, redirecting...");
      // Optionally redirect to login page or handle logout
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
