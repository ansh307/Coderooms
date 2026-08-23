import Link from "next/link";
import { ArrowRight, Code2, Plus, UserRound } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Plus,
    title: "Create a room",
    description: "Create a new room in seconds, with no setup or hassle.",
  },
  {
    number: "02",
    icon: UserRound,
    title: "Invite your team",
    description: "Share the room link and invite anyone to join.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Code together",
    description: "Collaborate in real time, run code, and build together.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full px-5 py-10 sm:py-24 sm:px-8 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Header */}
        <div className="max-w-[720px]">
          <h2 className="mt-7 max-w-[680px] text-[42px] font-semibold leading-[1.08] tracking-[-0.045em] text-primary sm:text-[52px] lg:text-[56px]">
            Get started in three simple steps.
          </h2>

          <p className="mt-5 max-w-[560px] text-[17px] leading-[1.65] tracking-[-0.01em] text-gray-muted sm:text-[18px]">
            Create a room, invite your teammates, and start coding together in
            real time.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20">
          <div className="grid grid-cols-1 border-y border-border-color lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className={[
                    "group relative py-10 lg:px-10 lg:py-12",
                    index !== 0
                      ? "border-t border-border-color lg:border-l lg:border-t-0"
                      : "",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-6">
                    {/* Number */}
                    <span className="shrink-0 pt-1 font-mono text-[12px] font-medium tracking-[0.08em] text-gray-light">
                      {step.number}
                    </span>

                    <div>
                      {/* Icon */}
                      <div className="mb-7 flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-primary-heading transition-colors duration-200 group-hover:bg-surface-muted group-hover:text-primary">
                        <Icon size={19} strokeWidth={1.7} />
                      </div>

                      {/* Title */}
                      <h3 className="text-[20px] font-semibold tracking-[-0.03em] dark:translate-y-0 sm:dark:translate-y-15 sm:dark:group-hover:translate-y-0 transition-transform duration-300  text-primary-heading">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="mt-3 max-w-[260px] text-[15px] leading-[1.65] 
                            transition-opacity duration-500
                            dark:opacity-100
                            sm:dark:opacity-0
                            sm:dark:group-hover:opacity-100"
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 pt-8">
          <Link
            href="/signup"
            className="group inline-flex items-center gap-3 text-[15px] font-medium text-primary-heading"
          >
            <span className="border-b border-border-color pb-1 transition-colors group-hover:border-primary group-hover:text-primary">
              Ready to begin?
            </span>

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
