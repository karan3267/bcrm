import axios from "axios";

const dataApi=axios.create({
    baseURL:'http://localhost:8080'
});

dataApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Adjust this according to where you store the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

export default dataApi;