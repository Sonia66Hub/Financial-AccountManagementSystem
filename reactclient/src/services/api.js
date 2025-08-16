// src/services/api.js

import axios from 'axios';


const api = axios.create({
  baseURL: 'https://localhost:7294/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  config => {
  
    const token = localStorage.getItem('jwtToken') || localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
