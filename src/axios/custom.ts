import axios from "axios";

// Không cần import dotenv, không gọi dotenv.config() trong frontend

const customFetch = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/", // Đúng cú pháp cho React
  headers: {
    Accept: "application/json",
  },
});

customFetch.interceptors.request.use((config) => {
  const domain = window.location.hostname;
  config.headers["X-Client-Domain"] = domain;  // Gắn vào header
  return config;
}, (error) => Promise.reject(error));

export default customFetch;
