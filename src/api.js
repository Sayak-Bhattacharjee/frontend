import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',  // Replace with your backend's URL if hosted
});

export default api;
