import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="w-full px-5 py-10 sm:py-24 sm:px-8 lg:pt-14 pb-32">
      <div className="mx-auto max-w-[760px] text-center">
        {/* Heading */}
        <h2 className="mt-7 text-[40px] font-semibold leading-[1.08] tracking-[-0.045em] text-primary sm:text-[48px] lg:text-[52px]">
          Ready to build together?
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-[1.65] text-primary-heading sm:text-[18px]">
          Create your first room and start coding together in real time.
        </p>

        {/* CTA */}
        <div className="mt-9 flex justify-center">
          <Link
            href="/signup"
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-all duration-200 hover:bg-primary-not-selected hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
          >
            Create your first room
            <ArrowRight
              size={18}
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
