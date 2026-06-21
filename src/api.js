import axios from 'axios';

const api = axios.create({
  baseURL: 'https://web-production-057db.up.railway.app/api/',
});

export default api;