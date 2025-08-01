import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/',
});


const publicRoutes = [
  '/account/login/',
  '/account/send-reset-password-email/',
];

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');

  if (token && !publicRoutes.includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
