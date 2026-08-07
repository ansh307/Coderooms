"use client";

import AuthForm from "./AuthForm";

export default function SignupForm() {
  async function handleSignup(data: {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    role: string;
  }) {
    console.log(data);

    // await authService.signup(data);
  }

  return <AuthForm mode="signup" onSubmit={handleSignup} />;
}
