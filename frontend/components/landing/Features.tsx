import {
  ArrowRight,
  Code2,
  Cloud,
  Globe2,
  History,
  Lock,
  MessageSquare,
  Play,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    number: "01",
    icon: UsersRound,
    title: "Real-time collaboration",
    description:
      "Code together in the same room and see every change as it happens.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Built-in chat",
    description:
      "Talk through ideas, share context, and stay focused without leaving the editor.",
  },
  {
    number: "03",
    icon: Play,
    title: "Run & debug",
    description:
      "Run your code and debug directly inside your collaborative workspace.",
  },
  {
    number: "04",
    icon: Globe2,
    title: "Share instantly",
    description:
      "Create a room, copy the link, and bring your team in within seconds.",
  },
  {
    number: "05",
    icon: Code2,
    title: "Multi-language support",
    description:
      "Write and collaborate across 20+ programming languages with syntax highlighting.",
  },
  {
    number: "06",
    icon: Cloud,
    title: "Save & sync",
    description:
      "Your work is automatically saved and synced so you can pick up anywhere.",
  },
  {
    number: "07",
    icon: History,
    title: "Version history",
    description:
      "Review your changes and restore previous versions whenever you need.",
  },
  {
    number: "08",
    icon: Lock,
    title: "Secure & private",
    description:
      "Keep your rooms and code private with security built into the workspace.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="w-full px-5 py-24 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Header */}
        <div className="max-w-[720px]">
          <p className="mb-5 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-gray-muted">
            Features
          </p>

          <h2 className="max-w-[680px] text-[42px] font-semibold leading-[1.08] tracking-[-0.045em] text-primary sm:text-[52px] lg:text-[56px]">
            Everything you need
            <br />
            to code together.
          </h2>

          <p className="mt-5 max-w-[560px] text-[17px] leading-[1.65] tracking-[-0.01em] text-gray-muted sm:text-[18px]">
            A focused workspace with everything your team needs to collaborate,
            build, and ship better code.
          </p>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 border-y border-border-color sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            const isSecondColumn = index % 4 !== 0;
            const isSecondRow = index >= 4;

            return (
              <div
                key={feature.number}
                className={[
                  "group relative min-h-[245px] py-10",
                  "lg:px-8 lg:py-11",
                  index % 4 !== 0 ? "lg:border-l lg:border-border-color" : "",
                  isSecondRow ? "border-t border-border-color lg:border-t" : "",
                  index % 2 !== 0
                    ? "sm:border-l sm:border-border-color lg:border-l"
                    : "",
                ].join(" ")}
              >
                {/* Number + Icon */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[12px] font-medium tracking-[0.08em] text-gray-light">
                    {feature.number}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-10">
                  <h3 className="text-[18px] font-semibold tracking-[-0.03em] dark:translate-y-20 dark:group-hover:translate-y-0 transition-transform duration-300  text-primary-heading">
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-3 max-w-[235px] text-[14px] leading-[1.7] text-gray-muted
                      transition-opacity duration-500
                      dark:opacity-0
                      dark:group-hover:opacity-100
                    "
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 pt-8">
          <Link
            href="/signup"
            className="group inline-flex items-center gap-3 text-[15px] font-medium text-primary-heading"
          >
            <span className="border-b border-border-color pb-1 group-hover:border-primary group-hover:text-primary">
              Explore all features
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
