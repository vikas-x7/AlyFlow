import axiosLib from "axios";

const axios = axiosLib.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "",
});

axios.interceptors.request.use((config) => {
  return config;
});

export default axios;

