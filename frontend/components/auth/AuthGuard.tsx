"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import refreshApi from "@/api/refresh";
import useAuthStore from "@/store/auth.store";

interface AuthGuardProps {
  children: ReactNode;
}

interface RefreshResponse {
  accessToken: string;
}

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();

  const [status, setStatus] = useState<AuthStatus>("checking");

  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      const token = useAuthStore.getState().accessToken;

      // Access token exists
      if (token) {
        if (mounted) {
          setStatus("authenticated");
        }

        return;
      }

      // No access token.
      // Try refresh token.
      try {
        const response =
          await refreshApi.post<RefreshResponse>("/auth/refresh");

        const newAccessToken = response.data.accessToken;

        useAuthStore.getState().setAccessToken(newAccessToken);

        if (mounted) {
          setStatus("authenticated");
        }
      } catch (error) {
        console.error("Failed to restore authentication:", error);
        toast.error("Failed to restore authentication");
        useAuthStore.getState().clearAuth();

        if (mounted) {
          setStatus("unauthenticated");
        }
      }
    };

    restoreSession();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "checking") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Redirecting...</div>;
  }

  return <>{children}</>;
}
