import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";

type ComingSoonProps = {
  title?: string;
  description?: string;
  eyebrow?: string;
  buttonText?: string;
  buttonHref?: string;
  showBackButton?: boolean;
  backText?: string;
  backHref?: string;
};

export default function ComingSoon({
  title = "Something new is coming.",
  description = "We’re working on something useful. It’s not ready just yet, but we’re getting closer.",
  eyebrow = "Coming soon",
  buttonText = "Go back home",
  buttonHref = "/",
  showBackButton = false,
  backText = "Back",
  backHref = "/",
}: ComingSoonProps) {
  return (
    <main className="relative flex min-h-[calc(100vh)] items-center overflow-hidden">
      <section className="mx-auto w-full max-w-[1180px] px-5 py-24 text-center sm:px-8 lg:pt-60 lg:pb-52">
        {/* Eyebrow */}
        <p className="mt-7 text-[12px] font-medium uppercase tracking-[0.1em] text-gray-light">
          {eyebrow}
        </p>

        {/* Heading */}
        <h1 className="mx-auto mt-6 max-w-[850px] text-[52px] font-semibold leading-[1.02] tracking-[-0.055em] text-primary sm:text-[70px] lg:text-[72px]">
          {title}
        </h1>

        {/* Description */}
        <p className="mx-auto mt-7 max-w-[560px] text-[18px] leading-[1.65] tracking-[-0.015em] text-primary-heading sm:text-[20px]">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {showBackButton && (
            <Link
              href={backHref}
              className="group inline-flex h-11 items-center justify-center gap-3 rounded-full border border-border-color bg-surface px-6 text-[15px] font-medium text-primary-heading transition-colors hover:bg-surface-muted"
            >
              <ArrowLeft
                size={16}
                strokeWidth={1.8}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />

              {backText}
            </Link>
          )}

          <Link
            href={buttonHref}
            className="group inline-flex h-11 items-center justify-center gap-3 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-all hover:bg-primary-heading hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
          >
            {buttonText}

            <ArrowRight
              size={17}
              strokeWidth={1.9}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Bottom detail */}
        <div className="mx-auto mt-20 flex max-w-[420px] items-center justify-center gap-3 border-t border-border-color pt-6 text-[13px] text-gray-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />

          <span>We’re building it with care.</span>
        </div>
      </section>
    </main>
  );
}
