import { Suspense } from "react";
import VerifyEmail from "./VerifyEmail";

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black px-4">
          <div className="text-sm text-white/60">Verifying your email...</div>
        </div>
      }
    >
      <VerifyEmail />
    </Suspense>
  );
}
