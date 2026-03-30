import axios from 'axios';

// Create an Axios instance with base URL for the backend
export const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // Crucial for NextAuth session cookies to be sent cross-origin
});

// Add an interceptor to handle errors globally if needed
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
