import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-sm text-white/60">Loading...</div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
