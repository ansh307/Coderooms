import refreshApi from "@/api/refresh";
import useAuthStore from "@/store/auth.store";

interface RefreshResponse {
  accessToken: string;
}

let refreshPromise: Promise<string> | null = null;

export async function refreshSession(): Promise<string> {
  /*
   * A refresh request is already running.
   *
   * Don't create another one.
   * Everyone waits for the same Promise.
   */
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await refreshApi.post<RefreshResponse>(
        "/auth/refresh",
      );

      const newAccessToken = response.data.accessToken;

      if (!newAccessToken) {
        throw new Error("No access token returned");
      }

      useAuthStore
        .getState()
        .setAccessToken(newAccessToken);

      return newAccessToken;
    } finally {
      /*
       * Important:
       *
       * Once refresh finishes, allow another
       * refresh in the future.
       */
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}