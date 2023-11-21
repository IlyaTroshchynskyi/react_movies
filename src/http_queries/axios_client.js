import axios from "axios";

export const axiosClient = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL,
        baseURL: 'http://0.0.0.0:8000/api/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export default axiosClient
