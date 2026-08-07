"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as authService from "@/services/auth.service";

import AuthForm from "@/components/auth/forms/AuthForm";

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogin(data: { email: string; password: string }) {
    try {
      setLoading(true);

      const result = await authService.login(data);

      console.log(result);

      router.push("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  return <AuthForm mode="login" loading={loading} onSubmit={handleLogin} />;
}
