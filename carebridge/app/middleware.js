import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: "https://carebridge-backend-fys5.onrender.com/", // Your Flask backend URL
  withCredentials: true, // Include cookies in requests (if needed)
});

// Add request interceptor (optional)
api.interceptors.request.use(
  (config) => {
    // Add headers, tokens, etc. here
    const token = localStorage.getItem("token"); // Example: Add JWT token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (e.g., redirect to login if unauthorized)
    if (error.response?.status === 401) {
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;