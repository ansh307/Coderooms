import api from "./axios";
import refreshApi from "./refresh";
import useAuthStore from "../store/auth.store";

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await refreshApi.post("/auth/refresh");

        const newToken = res.data.accessToken;

        useAuthStore
          .getState()
          .setAccessToken(newToken);

        originalRequest.headers.Authorization =
          `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore
          .getState()
          .clearAuth();

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);