"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/api";
import useAuthStore from "@/store/auth.store";

interface AuthGuardProps {
  children: ReactNode;
}

interface RefreshResponse {
  accessToken: string;
}

export default function AuthGuard({
  children,
}: AuthGuardProps): React.ReactElement {
  const router = useRouter();

  const accessToken = useAuthStore((state: any) => state.accessToken);
  const setAccessToken = useAuthStore((state: any) => state.setAccessToken);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const restoreSession = async (): Promise<void> => {
      if (accessToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.post<RefreshResponse>("/auth/refresh");
        setAccessToken(res.data.accessToken);
      } catch (error) {
        console.error(error);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [accessToken, router, setAccessToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
