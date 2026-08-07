import Button from "@/components/auth/forms/Button";
import Input from "@/components/auth/forms/Input";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-white">Forgot Password</h1>

        <form className="mt-8 space-y-6">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
          />

          <Button
            type="submit"
            className="h-11 w-full rounded-md bg-indigo-600 font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          >
            Send Reset Link
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
