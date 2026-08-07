"use client";

import { useEffect } from "react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <div className="flex min-h-screen">
        {/* Left */}
        <div className="hidden w-1/3 border-r border-white/10 lg:flex items-center justify-center">
          <div className="max-w-sm px-8">
            <span className="text-sm uppercase tracking-[0.3em] text-white/40">
              Something went wrong
            </span>

            <h1 className="mt-6 text-5xl font-bold text-white">
              Unexpected error
            </h1>

            <p className="mt-4 text-white/60 leading-relaxed">
              An unexpected error occurred while loading this page. Please try
              again.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="w-full max-w-lg">
            <div className="p-10">
              <p className="text-sm uppercase tracking-widest text-white/40">
                ERROR
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-white">
                Something went wrong.
              </h2>

              <p className="mt-4 text-white/60">
                This is usually temporary. You can try reloading the current
                page or return to the homepage.
              </p>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={reset}
                  className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  Try Again
                </button>

                <a
                  href="/"
                  className="rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/5"
                >
                  Go Home
                </a>
              </div>

              {process.env.NODE_ENV === "development" && (
                <pre className="mt-8 overflow-auto rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-xs text-red-300">
                  {error.message}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
