"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import Button from "@/components/auth/forms/Button";
import Input from "@/components/auth/forms/Input";
import * as authService from "@/services/auth.service";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await authService.resetPassword({
        token,
        password,
      });

      toast.success(response?.message || "Password updated successfully.");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      console.error("Reset password failed:", error);

      toast.error(
        error?.response?.data?.message || "Unable to reset password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-2 sm:px-6">
      <div className="w-full max-w-lg p-0 sm:p-8">
        <h1 className="text-3xl font-bold text-white">Reset Password</h1>

        <p className="mt-3 text-sm text-white/60">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <Input
            label="New Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-md bg-indigo-600 font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
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
