import axios from "axios";
import api from "./axios";
import useAuthStore from "../store/auth.store";

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/auth/refresh",
          {},
          {
            withCredentials: true,
          },
        );

        const newToken = res.data.accessToken;

        useAuthStore.getState().setAccessToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch {
        useAuthStore.getState().clearAuth();

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
