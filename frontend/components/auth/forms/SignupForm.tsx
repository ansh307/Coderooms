"use client";

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
  }): Promise<boolean> {
    try {
      setLoading(true);
      const response = await authService.signup(data);

      toast.success(
        response?.message || "Signup successful. Please check your email.",
      );

      setEmailSent(true);
      return true;
    } catch (error) {
      toast.error("Signup failed!");
      return false;
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
