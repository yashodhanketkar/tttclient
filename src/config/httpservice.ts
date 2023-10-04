import axios from "axios";

// const BASE_URL = import.meta.env.BASE_URL;
// if (!BASE_URL) throw new Error("Error setting up connection with server");

// axios.defaults.baseURL = "http://127.0.0.1:5555/api/";
axios.defaults.baseURL = "http://192.168.1.4:5555/api/";

axios.defaults.headers.common["authorization"] =
  "Bearer " + (localStorage.getItem("token") || "");

export const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
