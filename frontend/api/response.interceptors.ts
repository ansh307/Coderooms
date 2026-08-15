import api from "./axios";
import useAuthStore from "@/store/auth.store";
import { refreshSession } from "@/auth/refreshSession";

let redirectingToLogin = false;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    /*
     * Only handle authentication failures.
     */
    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.skipAuthRefresh
    ) {
      return Promise.reject(error);
    }

    /*
     * Mark this request so it cannot
     * enter an infinite refresh loop.
     */
    originalRequest._retry = true;

    try {
      /*
       * If another request is already refreshing,
       * this request waits for that same Promise.
       */
      const newToken = await refreshSession();

      /*
       * Update Authorization header
       * with the new access token.
       */
      originalRequest.headers.Authorization =
        `Bearer ${newToken}`;

      /*
       * Retry the original request.
       */
      return api(originalRequest);
    } catch (refreshError) {
      /*
       * Refresh token is invalid/expired.
       * User is genuinely unauthenticated.
       */
      useAuthStore.getState().clearAuth();

      /*
       * Prevent multiple simultaneous
       * redirects when many requests fail.
       */
      if (!redirectingToLogin) {
        redirectingToLogin = true;

        window.location.replace("/login");
      }

      return Promise.reject(refreshError);
    }
  },
);