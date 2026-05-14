import axios, { type InternalAxiosRequestConfig } from "axios";

const API_URL: string = import.meta.env.VITE_BASE_URL_HTTP!;

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("ttt_access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
