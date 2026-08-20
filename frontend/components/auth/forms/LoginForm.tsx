"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as authService from "@/services/auth.service";

import AuthForm from "@/components/auth/forms/AuthForm";
import useAuthStore from "@/store/auth.store";

import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  async function handleLogin(data: {
    email: string;
    password: string;
  }): Promise<boolean> {
    try {
      setLoading(true);

      const result = await authService.login(data);

      setAuth({ user: result.user, accessToken: result.accessToken });
      toast.success(result?.message || "Login successful. Redirecting....");

      setTimeout(() => {
        router.push("/home");
      }, 2000);
      // router.push("/home");
      return true;
    } catch (error: any) {
      // alert(error.response?.data?.message);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
      return false;
    } finally {
      setLoading(false);
    }
  }

  return <AuthForm mode="login" loading={loading} onSubmit={handleLogin} />;
}
