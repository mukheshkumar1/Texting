// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // Adjust according to your backend deployment path
  withCredentials: true, // To include cookies if needed
});

export default axiosInstance;
