import axios from 'axios';

// Throw error if no API URL is set
if (!import.meta.env.VITE_API_URL) {
  throw new Error("VITE_API_URL is not defined");
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // No fallback to localhost here
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Use the header expected by your backend:
      config.headers['Authorization'] = `Bearer ${token}`; // or use 'x-auth-token'
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
