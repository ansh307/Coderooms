"use client";

import Link from "next/link";
import { ArrowRight, Laptop, UsersRound, Zap } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

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

const movingText = "CODE TOGETHER • BUILD BETTER •";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char");

      if (!chars.length) return;

      /*
       * Every character travels through the complete path.
       * We delay each character so they form a continuous stream.
       */
      const duration = 8;
      const stagger = 0.04;

      chars.forEach((char, index) => {
        gsap.fromTo(
          char,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
            delay: index * stagger,
            ease: "power2.out",
          },
        );

        gsap.to(char, {
          motionPath: {
            path: "#hero-curve",
            align: "#hero-curve",
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: 0,
            end: 1,
          },
          duration,
          delay: index * stagger,
          ease: "none",
          repeat: -1,
        });
      });

      /*
       * Animate the dashed curve.
       */
      gsap.to("#hero-curve", {
        strokeDashoffset: -200,
        duration: 12,
        ease: "none",
        repeat: -1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // M -127 315 C 166 26 469 22 804 145 C 1061 244 1455 196 1835 -218
  return (
    <main ref={heroRef} className="relative overflow-hidden">
      {/* Curved animation */}
      <div className="pointer-events-none absolute left-1/2 top-[175px] z-0 h-[430px] w-[160vw] -translate-x-1/2 sm:top-[185px] sm:h-[450px] lg:top-[245px] lg:h-[500px]">
        <svg
          viewBox="0 0 1600 500"
          className="h-full w-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="hero-curve"
            d="M -127 315 C 166 26 469 22 818 120 C 1081 176 1455 196 1835 -218"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="8 12"
            strokeDashoffset="0"
            className="text-border-color"
            opacity="0.45"
            fill="none"
          />
        </svg>

        <div
          id="hero-moving-text"
          className="pointer-events-none absolute inset-0"
        >
          {movingText
            .split("")
            .reverse()
            .map((char, index) => (
              <span
                key={`${char}-${index}`}
                className="hero-char absolute left-0 top-0 inline-block whitespace-pre text-[11px] font-medium tracking-[0.18em] text-gray-light"
              >
                {char}
              </span>
            ))}
        </div>
      </div>
      <section className="relative mx-auto flex min-h-[calc(100vh-160px)] max-w-[1180px] flex-col items-center px-5 pb-24 pt-24 text-center sm:px-8 sm:pt-28 lg:pt-48">
        {/* Heading */}
        <h1 className="relative z-10 mt-7 max-w-[900px] text-[54px] font-semibold leading-[1.02] tracking-[-0.055em] text-primary sm:text-[72px] lg:text-[88px]">
          Code together.
          <br />
          Build better.
        </h1>

        {/* Description */}
        <p className="relative z-10 mt-7 max-w-[620px] text-[18px] leading-[1.65] tracking-[-0.015em] text-primary-heading sm:text-[20px]">
          A real-time collaborative code editor for developers. Share, code, and
          learn together from anywhere.
        </p>

        {/* CTA */}
        <div className="relative z-10 mt-9 flex flex-col items-center gap-3 sm:flex-row">
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
        <div className="relative z-10 mt-16 flex flex-col items-center gap-4 text-gray-muted sm:flex-row sm:gap-0">
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
