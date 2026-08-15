"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import useAuthStore from "@/store/auth.store";
import { refreshSession } from "@/auth/refreshSession";
import LoadingSpinner from "../ui/LoadingSpinner";

interface AuthGuardProps {
  children: ReactNode;
}

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();

  const [status, setStatus] = useState<AuthStatus>("checking");

  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      const token = useAuthStore.getState().accessToken;

      /*
       * Access token already exists
       */
      if (token) {
        if (mounted) {
          setStatus("authenticated");
        }

        return;
      }

      /*
       * No access token.
       * Try to restore using refresh token.
       */
      try {
        await refreshSession();

        if (mounted) {
          setStatus("authenticated");
        }
      } catch (error) {
        console.error("Failed to restore authentication:", error);

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

  if (status === "checking" || status === "unauthenticated") {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner
          size="lg"
          message={status === "unauthenticated" ? "Redirecting" : "Loading"}
        />
      </div>
    );
  }

  return <>{children}</>;
}
