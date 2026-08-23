"use client";

import FinalCTA from "@/components/landing/FinalCTA";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    description: "Everything you need to start coding together.",
    monthly: 0,
    yearly: 0,
    features: [
      "Up to 3 collaborators",
      "5 active rooms",
      "Real-time code editing",
      "Basic code execution",
      "Community support",
    ],
    cta: "Get started free",
    href: "/signup",
  },
  {
    name: "Pro",
    description: "More power for developers and small teams.",
    monthly: 12,
    yearly: 9,
    popular: true,
    features: [
      "Up to 10 collaborators",
      "Unlimited rooms",
      "Real-time code editing",
      "Advanced code execution",
      "Room history",
      "Priority support",
    ],
    cta: "Start free trial",
    href: "/signup",
  },
  {
    name: "Team",
    description: "Everything your team needs to build together.",
    monthly: 24,
    yearly: 19,
    features: [
      "Unlimited collaborators",
      "Unlimited rooms",
      "Advanced code execution",
      "Room history",
      "Team management",
      "Priority support",
    ],
    cta: "Get started",
    href: "/signup",
  },
];

const comparison = [
  {
    feature: "Collaborators",
    free: "3",
    pro: "10",
    team: "Unlimited",
  },
  {
    feature: "Rooms",
    free: "5",
    pro: "Unlimited",
    team: "Unlimited",
  },
  {
    feature: "Real-time collaboration",
    free: true,
    pro: true,
    team: true,
  },
  {
    feature: "Code execution",
    free: "Basic",
    pro: "Advanced",
    team: "Advanced",
  },
  {
    feature: "Room history",
    free: false,
    pro: true,
    team: true,
  },
  {
    feature: "Team management",
    free: false,
    pro: false,
    team: true,
  },
  {
    feature: "Priority support",
    free: false,
    pro: true,
    team: true,
  },
];

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check size={17} strokeWidth={2} className="mx-auto text-primary" />;
  }

  if (value === false) {
    return <span className="text-gray-light">—</span>;
  }

  return (
    <span className="text-[14px] font-medium text-primary-heading">
      {value}
    </span>
  );
}

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <main className="relative overflow-">
      {/* Hero */}
      <section className="mx-auto max-w-[1180px] px-5 pb-20 pt-24 text-center sm:px-8 sm:pt-28 lg:pt-48">
        <h1 className="mx-auto mt-7 max-w-[850px] text-[52px] font-semibold leading-[1.02] tracking-[-0.055em] text-primary sm:text-[68px] lg:text-[80px]">
          Plans that scale
          <br />
          with your team.
        </h1>

        <p className="mx-auto mt-7 max-w-[600px] text-[18px] leading-[1.65] tracking-[-0.015em] text-primary-heading sm:text-[20px]">
          Start coding together for free. Upgrade when you need more
          collaborators, rooms, and powerful features.
        </p>

        {/* Billing toggle */}
        <div className="mt-32 inline-flex items-center rounded-full border border-border-color bg-surface-muted p-1">
          <button
            onClick={() => setYearly(false)}
            className={[
              "rounded-full px-5 py-2 text-[13px] font-medium transition-all",
              !yearly
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-gray-light hover:text-primary",
            ].join(" ")}
          >
            Monthly
          </button>

          <button
            onClick={() => setYearly(true)}
            className={[
              "rounded-full px-5 py-2 text-[13px] font-medium transition-all",
              yearly
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-gray-light hover:text-primary",
            ].join(" ")}
          >
            Yearly
            <span className="ml-1.5 text-[11px] opacity-70">Save 25%</span>
          </button>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="mx-auto max-w-[1180px] px-5 pb-28 sm:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const price = yearly ? plan.yearly : plan.monthly;

            return (
              <div
                key={plan.name}
                className={[
                  "relative flex flex-col rounded-2xl border p-7 sm:p-8  transition-transform duration-200",
                  plan.popular
                    ? "border-border-color bg-surface sm:scale-105 "
                    : "border-border-color bg-surface sm:hover:scale-105",
                ].join(" ")}
              >
                {plan.popular && (
                  <div className="absolute right-6 top-6 rounded-full bg-surface-muted px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
                    Most popular
                  </div>
                )}

                <div>
                  <h2
                    className={[
                      "text-[20px] font-semibold tracking-[-0.03em]",
                      plan.popular
                        ? "text-primary-heading"
                        : "text-primary-heading",
                    ].join(" ")}
                  >
                    {plan.name}
                  </h2>

                  <p
                    className={[
                      "mt-3 max-w-[260px] text-[14px] leading-[1.6]",
                      plan.popular ? "text-gray-muted" : "text-gray-muted",
                    ].join(" ")}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="mt-8 flex items-end gap-1">
                  <span
                    className={[
                      "text-[52px] font-semibold leading-none tracking-[-0.055em]",
                      plan.popular ? "text-primary" : "text-primary",
                    ].join(" ")}
                  >
                    ${price}
                  </span>

                  <span
                    className={[
                      "pb-1 text-[13px]",
                      plan.popular ? "text-gray-muted" : "text-gray-muted",
                    ].join(" ")}
                  >
                    / month
                  </span>
                </div>

                {yearly && plan.monthly > 0 && (
                  <p
                    className={[
                      "mt-2 text-[12px]",
                      plan.popular ? "text-gray-light" : "text-gray-light",
                    ].join(" ")}
                  >
                    Billed annually
                  </p>
                )}

                <Link
                  href={plan.href}
                  className={[
                    "group mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[14px] font-medium transition-all",
                    plan.popular
                      ? "bg-surface-muted text-primary hover:bg-primary hover:text-primary-foreground"
                      : "bg-surface-muted text-primary hover:bg-primary hover:text-primary-foreground",
                  ].join(" ")}
                >
                  {plan.cta}

                  <ArrowRight
                    size={16}
                    strokeWidth={1.9}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>

                <div
                  className={[
                    "my-8 h-px",
                    plan.popular ? "bg-border-color" : "bg-border-color",
                  ].join(" ")}
                />

                <p
                  className={[
                    "mb-5 text-[12px] font-medium uppercase tracking-[0.08em]",
                    plan.popular ? "text-gray-light" : "text-gray-light",
                  ].join(" ")}
                >
                  Includes
                </p>

                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={16}
                        strokeWidth={2}
                        className={[
                          "mt-0.5 shrink-0",
                          plan.popular ? "text-primary" : "text-primary",
                        ].join(" ")}
                      />

                      <span
                        className={[
                          "text-[14px]",
                          plan.popular
                            ? "text-primary-heading"
                            : "text-primary-heading",
                        ].join(" ")}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison */}
      <section className="w-full  px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-[620px]">
            <h2 className="text-[40px] font-semibold leading-[1.08] tracking-[-0.045em] text-primary sm:text-[52px]">
              Everything you need to build together.
            </h2>

            <p className="mt-5 text-[17px] leading-[1.65] text-gray-muted sm:text-[18px]">
              Compare plans and choose the setup that fits the way your team
              works.
            </p>
          </div>

          <div className="mt-16 overflow-x-auto">
            <div className="min-w-[680px]">
              {/* Table header */}
              <div className="grid grid-cols-4 border-y border-border-color py-5">
                <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-gray-light">
                  Features
                </div>

                {["Free", "Pro", "Team"].map((plan) => (
                  <div
                    key={plan}
                    className="text-center text-[13px] font-semibold text-primary-heading"
                  >
                    {plan}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {comparison.map((item) => (
                <div
                  key={item.feature}
                  className="grid grid-cols-4 items-center border-b border-border-color py-5"
                >
                  <div className="text-[14px] text-primary-heading">
                    {item.feature}
                  </div>

                  <div className="text-center">
                    <FeatureValue value={item.free} />
                  </div>

                  <div className="text-center">
                    <FeatureValue value={item.pro} />
                  </div>

                  <div className="text-center">
                    <FeatureValue value={item.team} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
