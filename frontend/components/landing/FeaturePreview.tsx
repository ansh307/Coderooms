"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturePreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        mobile: "(max-width: 639px)",
        desktop: "(min-width: 640px)",
      },
      (context) => {
        const { mobile } = context.conditions!;

        if (mobile) {
          // Mobile animation
          gsap.to(previewRef.current, {
            scale: 1,
            rotateX: 0,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 40%",
              scrub: 1,
            },
          });
        } else {
          // sm+ animation
          gsap.to(previewRef.current, {
            scale: 1,
            rotateX: 0,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "20% 80%",
              scrub: 1,
            },
          });
        }
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-6 pt-8 sm:px-8 sm:pb-32 lg:px-16"
    >
      <div className="mx-auto max-w-[1350px]" style={{ perspective: "1400px" }}>
        <div
          ref={previewRef}
          className="overflow-hidden rounded-2xl border border-border-color bg-primary-foreground shadow-[0_20px_60px_rgba(0,0,0,0.07)]"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center bottom",
            transform:
              "perspective(1400px) rotateX(18deg) scale(0.82) translateY(80px)",
          }}
        >
          <img
            src="/feature-preview-image.png"
            alt="CodeRooms collaborative coding workspace"
            className="block h-auto w-full dark:hidden"
          />

          <img
            src="/feature-preview-image-dark.png"
            alt="CodeRooms collaborative coding workspace"
            className="hidden h-auto w-full dark:block"
          />
        </div>
      </div>
    </section>
  );
}
