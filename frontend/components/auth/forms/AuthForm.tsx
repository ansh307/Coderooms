"use client";

import Link from "next/link";
import { useState } from "react";

import AuthCard from "./AuthCard";
import Button from "./Button";
import Input from "./Input";
import PasswordInput from "./PasswordInput";

type Mode = "login" | "signup";

interface AuthFormProps {
  mode: Mode;
  loading?: boolean;
  onSubmit: (values: any) => Promise<boolean>;
  emailSent?: boolean;
}

export default function AuthForm({
  mode,
  loading = false,
  onSubmit,
  emailSent = false,
}: AuthFormProps) {
  const isSignup = mode === "signup";

  const initialForm = {
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    role: "user",
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = isSignup
      ? {
          name: form.name,
          email: form.email,
          password: form.password,
          age: Number(form.age),
          gender: form.gender,
          role: form.role,
        }
      : {
          email: form.email,
          password: form.password,
        };

    const success = await onSubmit(payload);

    if (success) {
      setForm(initialForm);
    }
  }
  return (
    <AuthCard>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            {isSignup ? "Create account" : "Sign in"}
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Sign in
                </Link>
              </>
            ) : (
              <>
                New to CodeRooms?{" "}
                <Link
                  href="/signup"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Create an account
                </Link>
              </>
            )}
          </p>
        </div>

        {isSignup && (
          <div className="space-y-4">
            <Input
              autoComplete="username"
              label="Full Name"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
            />

            <Input
              autoComplete="age"
              label="Age"
              name="age"
              type="number"
              placeholder="22"
              value={form.age}
              onChange={handleChange}
              min={5}
              max={110}
              required
            />

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-200">
                Gender
              </label>

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="h-11 mt-1 w-full rounded-md border border-white/10 bg-[#181818] px-4 text-white/60 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
              >
                <option value="" className="bg-[#181818] text-white/60">
                  Select Gender
                </option>
                <option value="male" className="bg-[#181818] text-white">
                  Male
                </option>
                <option value="female" className="bg-[#181818] text-white">
                  Female
                </option>
                <option value="other" className="bg-[#181818] text-white">
                  Other
                </option>
              </select>
            </div>
          </div>
        )}

        <Input
          autoComplete="email"
          label="Email"
          type="email"
          name="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <PasswordInput
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        {isSignup && emailSent && (
          <p className="text-center text-xs text-zinc-500">
            We&apos;ve sent you a verification link to your email address.
            Please check your inbox and click the link to verify your account.
          </p>
        )}

        {!isSignup && (
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              Forgot password?
            </Link>
          </div>
        )}

        <Button loading={loading} type="submit">
          {isSignup ? "Create Account" : "Sign In"}
        </Button>

        {/* {isSignup && (
          <p className="text-center text-xs text-zinc-500">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="text-indigo-400">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-indigo-400">
              Privacy Policy
            </Link>
            .
          </p>
        )} */}
      </form>
    </AuthCard>
  );
}
