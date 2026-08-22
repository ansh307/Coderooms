"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-landing-black">
      <div className="flex min-h-screen">
        {/* Left */}
        <div className="hidden w-1/3 border-r border-white/10 lg:flex items-center justify-center">
          <div className="max-w-sm px-8">
            <span className="text-sm uppercase tracking-[0.3em] text-white/40">
              404 Error
            </span>

            <h1 className="mt-6 text-5xl font-bold text-white">
              Page not found
            </h1>

            <p className="mt-4 text-white/60 leading-relaxed">
              The page you're looking for doesn't exist or may have been moved.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="w-full max-w-lg">
            <div className=" p-10">
              <p className="text-sm uppercase tracking-widest text-white/40">
                404
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-white">
                Oops! We couldn't find that page.
              </h2>

              <p className="mt-4 text-white/60">
                It may have been deleted, renamed, or the URL might be
                incorrect.
              </p>

              <div className="mt-8 flex gap-4">
                <Link
                  href="/"
                  className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  Go Home
                </Link>

                <button
                  onClick={() => window.history.back()}
                  className="rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/5"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
