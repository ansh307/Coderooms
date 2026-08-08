"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import * as authService from "@/services/auth.service";

import Button from "@/components/auth/forms/Button";
import { api } from "@/api";

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const verificationStarted = useRef(false);

  const [resending, setResending] = useState(false);

  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );

  const [message, setMessage] = useState(
    "We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.",
  );

  useEffect(() => {
    // Prevent duplicate API calls in React Strict Mode
    if (verificationStarted.current) {
      return;
    }

    verificationStarted.current = true;

    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    let redirectTimer: NodeJS.Timeout | undefined;

    const verifyEmail = async () => {
      try {
        const response = await api.get(
          `/auth/verify-email?token=${encodeURIComponent(token)}`,
        );

        console.log("Email verification successful:", response.data);

        setStatus("success");
        setMessage("Your email has been verified successfully.");
        toast.success(
          "Your email has been verified successfully. Redirecting....",
        );

        redirectTimer = setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (error: any) {
        console.error("Email verification failed:", error);
        toast.error(
          error?.response?.data?.message ||
            "This verification link is invalid or has expired.",
        );

        setStatus("error");

        setMessage(
          error?.response?.data?.message ||
            "This verification link is invalid or has expired.",
        );
      }
    };

    verifyEmail();

    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [searchParams, router]);

  const handleResendVerification = async () => {
    if (!email) {
      toast.error("Email address is missing. Please sign up again.");
      return;
    }

    try {
      setResending(true);

      const response = await authService.resendVerificationEmail(email);

      toast.success(
        response?.message ||
          "Verification email sent. Please check your inbox.",
      );
    } catch (error: any) {
      console.error("Resend verification failed:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to resend verification email.",
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">
          {/* Icon */}
          <div className="text-center">
            <div
              className={`mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full ring-1 ${
                status === "error"
                  ? "bg-red-500/10 text-red-400 ring-red-500/20"
                  : status === "success"
                    ? "bg-green-500/10 text-green-400 ring-green-500/20"
                    : "bg-indigo-500/10 text-indigo-400 ring-indigo-500/20"
              }`}
            >
              {status === "error" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : status === "success" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5 12 4 4L19 6"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.25 12 14l9-5.75M4.5 19.5h15A1.5 1.5 0 0 0 21 18V6a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 3 6v12a1.5 1.5 0 0 0 1.5 1.5Z"
                  />
                </svg>
              )}
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {status === "error"
                ? "Verification failed"
                : status === "success"
                  ? "Email verified"
                  : "Verify your email"}
            </h1>

            {/* Message */}
            <p className="mt-3 text-sm leading-6 text-white/60">{message}</p>

            {/* Success */}
            {status === "success" && (
              <p className="mt-4 text-xs text-white/40">
                Redirecting you to the login page...
              </p>
            )}
          </div>

          {status === "error" && (
            <div className="mt-8">
              <Button
                type="button"
                onClick={handleResendVerification}
                disabled={resending}
                className="h-11 w-full rounded-md bg-indigo-600 font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {resending ? "Sending..." : "Resend Verification Email"}
              </Button>
            </div>
          )}

          {/* Login */}
          <p className="mt-6 text-center text-sm text-white/60">
            Already verified?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-400 transition hover:text-indigo-300"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
