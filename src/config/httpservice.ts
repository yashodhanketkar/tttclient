import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL_HTTP;
if (!BASE_URL) throw new Error("Error setting up connection with server");

axios.defaults.baseURL = BASE_URL;

axios.defaults.headers.common["authorization"] =
  "Bearer " + (localStorage.getItem("token") || "");

export const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
