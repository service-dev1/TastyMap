import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030',
  // baseURL: 'http://10.0.2.2:3030', // for android emulator
  withCredentials: true,
});

export default axiosInstance;
