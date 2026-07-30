import axios from 'axios';

const api = axios.create({
  baseURL: 'https://portfolio-backend-owrq.onrender.com/api/',
});

export default api;
