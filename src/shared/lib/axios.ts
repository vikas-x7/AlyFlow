import axiosLib from "axios";

const axios = axiosLib.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "",
});

axios.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("auth_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axios;

