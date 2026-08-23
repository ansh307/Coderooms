"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import Button from "@/components/auth/forms/Button";
import Input from "@/components/auth/forms/Input";
import * as authService from "@/services/auth.service";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      const response = await authService.forgotPassword(email);

      toast.success(
        response?.message ||
          "Password reset email sent. Please check your inbox.",
      );
    } catch (error: any) {
      console.error("Forgot password failed:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to send password reset email.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-red- px-2 sm:px-6">
      <div className="w-full max-w-lg sm:p-8">
        <h1 className="text-3xl font-bold text-white">Forgot Password</h1>

        <p className="mt-3 text-sm text-white/60">
          Enter your email and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-md bg-indigo-600 font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-white/60">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-400 transition hover:text-indigo-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
