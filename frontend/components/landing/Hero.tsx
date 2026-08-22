import Link from "next/link";
import { ArrowRight, Laptop, UsersRound, Zap } from "lucide-react";

const highlights = [
  {
    icon: Zap,
    label: "Real-time collaboration",
  },
  {
    icon: UsersRound,
    label: "Live coding",
  },
  {
    icon: Laptop,
    label: "Works anywhere",
  },
];

export default function Hero() {
  return (
    <main className="relative overflow-hidden">
      <section className="mx-auto flex min-h-[calc(100vh-160px)] max-w-[1180px] flex-col items-center px-5 pb-24 pt-24 text-center sm:px-8 sm:pt-28 lg:pt-48">
        {/* Eyebrow */}
        {/* <div className="inline-flex items-center gap-2 rounded-full border border-[#e4e6e9] bg-[#f8f8f9] px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.1em] text-[#687184]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#111318]" />
          Collaborative coding
        </div> */}

        {/* Heading */}
        <h1 className="mt-7 max-w-[900px] text-[54px] font-semibold leading-[1.02] tracking-[-0.055em] text-primary sm:text-[72px] lg:text-[88px]">
          Code together.
          <br />
          Build better.
        </h1>

        {/* Description */}
        <p className="mt-7 max-w-[620px] text-[18px] leading-[1.65] tracking-[-0.015em] text-primary-heading sm:text-[20px]">
          A real-time collaborative code editor for developers. Share, code, and
          learn together from anywhere.
        </p>

        {/* CTA */}
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="group inline-flex h-11 items-center justify-center gap-3 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-all hover:bg-primary-heading hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
          >
            Get started free
            <ArrowRight
              size={17}
              strokeWidth={1.9}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="#features"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border-color bg-surface px-6 text-[15px] font-medium text-primary-heading transition-colors hover:bg-surface-muted"
          >
            Learn more
          </Link>
        </div>

        {/* Highlights */}
        <div className="mt-16 flex flex-col items-center gap-4 text-gray-muted sm:flex-row sm:gap-0">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="flex items-center">
                <div className="flex items-center gap-2.5 px-6">
                  <Icon
                    size={17}
                    strokeWidth={1.7}
                    className="text-gray-muted"
                  />

                  <span className="text-[13px] font-medium">{item.label}</span>
                </div>

                {index !== highlights.length - 1 && (
                  <div className="hidden h-4 w-px bg-primary sm:block" />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
