import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token updates
// axiosInstance.interceptors.response.use(
//     (response) => {
//         // If the response contains a new token, update it in localStorage
//         if (response.data && response.data.newToken) {
//             localStorage.setItem("token", response.data.newToken);
//         }
//         return response;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
