import Axios from "axios";
import { notifyError } from "../toasts/toast";

const axiosInstance = Axios.create({
  baseURL: "http://localhost:3000/", // Update to your backend port
  withCredentials: true, // Send cookies for refresh token
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axiosInstance.get("/refresh-token", { withCredentials: true });
        localStorage.setItem("token", res.data.accessToken);

        // Update headers
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${res.data.accessToken}`;

        return axiosInstance(originalRequest); // Retry request
      } catch (err) {
        console.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        notifyError('Please Login to continue your session expired')
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
