import axios from 'axios';

// Throw error if no API URL is set
if (!import.meta.env.VITE_API_URL) {
  throw new Error("VITE_API_URL is not defined");
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // ✅ This is required if your backend sets credentials: true
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // or 'x-auth-token' if you use that
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
