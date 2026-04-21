import axios, { type InternalAxiosRequestConfig } from "axios";

const API_URL: string = import.meta.env.VITE_BASE_URL_HTTP!;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
