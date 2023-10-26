import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://0.0.0.0:8000/api/',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
});

export default axiosClient
