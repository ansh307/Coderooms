"use client";

import { useRouter } from "next/navigation";
import AuthForm from "./AuthForm";
import * as authService from "@/services/auth.service";
import { useState } from "react";
import { toast } from "sonner";

export default function SignupForm() {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignup(data: {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
  }) {
    try {
      setLoading(true);
      const response = await authService.signup(data);

      console.log("Signup successful:", response);
      toast.success(
        response?.message || "Signup successful. Please check your email.",
      );
      setEmailSent(true);
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthForm
      mode="signup"
      onSubmit={handleSignup}
      emailSent={emailSent}
      loading={loading}
    />
  );
}
