import Link from "next/link";

export default function AuthBranding() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden p-10">
      {/* Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-[140px]" />

      <div className="relative space-y-8 mx-auto">
        <Link href="/" className="text-3xl font-bold tracking-tight text-white">
          CodeRooms
        </Link>

        <div>
          <p className="mt-6 max-w-sm text-lg leading-8 text-zinc-400">
            A real-time collaborative workspace for developers to code,
            communicate and build together.
          </p>
        </div>
      </div>
    </div>
  );
}
