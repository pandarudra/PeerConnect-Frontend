import axios from "axios";
import { url } from "../config";

export const axiosInstance = axios.create({
  baseURL: `${url}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const res = await axios.post(`${url}/api/ref`, {
          withCredentials: true,
        });
        localStorage.setItem("token", res.data.token);
        return axiosInstance(originalConfig);
      } catch (err) {
        console.log(err);
      }
    }
    return Promise.reject(err);
  }
);
