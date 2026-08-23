"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturePreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-6 sm:pb-32 pt-8 sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-[1350px]" style={{ perspective: "1400px" }}>
        <div
          ref={previewRef}
          className="overflow-hidden rounded-2xl border border-border-color bg-primary-foreground shadow-[0_20px_60px_rgba(0,0,0,0.07)]"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center bottom",

            // Initial state is applied BEFORE the browser paints.
            transform:
              "perspective(1400px) rotateX(18deg) scale(0.82) translateY(80px)",
          }}
        >
          {/* Light */}
          <img
            src="/feature-preview-image.png"
            alt="CodeRooms collaborative coding workspace"
            className="block h-auto w-full dark:hidden"
          />

          {/* Dark */}
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
