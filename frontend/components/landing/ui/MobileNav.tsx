"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { ArrowUpRight, Menu, Plus } from "lucide-react";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] =
    useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Tablet menu
  const menuRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Mobile fullscreen menu
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Shared icon
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const toggleMenu = () => {
    if (!isOpen) {
      setIsMobileMenuVisible(true);
      setIsOpen(true);
    } else {
      setIsMobileMenuVisible(false);
      setIsOpen(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * Close when clicking outside
   * ---------------------------------------------------------
   */
  useLayoutEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: PointerEvent) => {
      const container = containerRef.current;

      if (!container) return;

      if (!container.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isOpen]);

  /*
   * ---------------------------------------------------------
   * Prevent body scrolling on mobile fullscreen menu
   * ---------------------------------------------------------
   */
  useLayoutEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 639px)");

    if (mediaQuery.matches) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /*
   * ---------------------------------------------------------
   * GSAP animations
   * ---------------------------------------------------------
   */
  useLayoutEffect(() => {
    const menu = menuRef.current;
    const mobileMenu = mobileMenuRef.current;
    const icon = iconRef.current;

    if (!menu || !mobileMenu || !icon) return;

    const links = linksRef.current.filter(
      (link): link is HTMLAnchorElement => link !== null,
    );

    const mobileLinks = mobileLinksRef.current.filter(
      (link): link is HTMLAnchorElement => link !== null,
    );

    const ctx = gsap.context(() => {
      if (isOpen) {
        /*
         * -----------------------------------------------
         * Tablet menu
         * -----------------------------------------------
         */

        gsap.to(menu, {
          height: "auto",
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });

        gsap.to(links, {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.35,
          ease: "power2.out",
          delay: 0.08,
        });

        /*
         * -----------------------------------------------
         * Mobile fullscreen menu
         * -----------------------------------------------
         */

        gsap.to(mobileMenu, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        });

        gsap.to(mobileLinks, {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.45,
          delay: 0.1,
          ease: "power3.out",
        });

        /*
         * -----------------------------------------------
         * Button icon
         * -----------------------------------------------
         */

        gsap.to(icon, {
          rotation: 45,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        /*
         * -----------------------------------------------
         * Tablet menu close
         * -----------------------------------------------
         */

        gsap.to(menu, {
          height: 0,
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: "power3.inOut",
        });

        gsap.to(links, {
          opacity: 0,
          y: 8,
          duration: 0.2,
          ease: "power2.in",
        });

        /*
         * -----------------------------------------------
         * Mobile fullscreen close
         * -----------------------------------------------
         */

        gsap.to(mobileMenu, {
          opacity: 0,
          scale: 0.98,
          y: 10,
          duration: 0.3,
          ease: "power3.inOut",
        });

        gsap.to(mobileLinks, {
          opacity: 0,
          y: 20,
          duration: 0.2,
          ease: "power2.in",
        });

        /*
         * -----------------------------------------------
         * Button icon
         * -----------------------------------------------
         */

        gsap.to(icon, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  /*
   * ---------------------------------------------------------
   * Render
   * ---------------------------------------------------------
   */

  return (
    <div ref={containerRef} className="fixed bottom-5 left-5 z-999 lg:hidden">
      {/* =====================================================
          MOBILE FULLSCREEN MENU
          Visible: < sm
          ===================================================== */}

      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-[-1] flex h-screen w-screen origin-bottom-left scale-[0.98] flex-col bg-surface px-6 pb-24 pt-24 opacity-0 sm:hidden ${isMobileMenuVisible ? "block" : "hidden"}`}
      >
        {/* Optional subtle border */}
        <div className="absolute inset-x-0 top-0 h-px bg-border-color" />
        <nav
          className="flex flex-col gap-1"
          onMouseLeave={() => {
            const links = mobileLinksRef.current.filter(
              (link): link is HTMLAnchorElement => link !== null,
            );

            // Reset all links
            gsap.to(links, {
              x: 0,
              opacity: 1,
              duration: 0.35,
              ease: "power3.out",
            });

            // Reset all arrows
            gsap.to(".mobile-nav-arrow", {
              x: -10,
              opacity: 0,
              duration: 0.25,
              ease: "power2.out",
            });

            // Reset all underlines
            gsap.to(".mobile-nav-line", {
              scaleX: 0,
              duration: 0.25,
              ease: "power2.out",
            });
          }}
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(element) => {
                mobileLinksRef.current[index] = element;
              }}
              onClick={() => setIsOpen(false)}
              onMouseEnter={() => {
                const links = mobileLinksRef.current.filter(
                  (link): link is HTMLAnchorElement => link !== null,
                );

                // Fade other links
                gsap.to(links, {
                  opacity: 0.35,
                  duration: 0.25,
                  ease: "power2.out",
                });

                // Highlight current link
                gsap.to(links[index], {
                  opacity: 1,
                  x: 18,
                  duration: 0.35,
                  ease: "power3.out",
                });

                // Current arrow
                const arrow = links[index].querySelector(".mobile-nav-arrow");

                if (arrow) {
                  gsap.to(arrow, {
                    x: 0,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power3.out",
                  });
                }

                // Current underline
                const line = links[index].querySelector(".mobile-nav-line");

                if (line) {
                  gsap.to(line, {
                    scaleX: 1,
                    duration: 0.4,
                    ease: "power3.out",
                  });
                }
              }}
              className="group relative flex w-fit items-center py-1 text-[42px] font-medium leading-[1.05] tracking-[-0.045em] text-primary-heading opacity-0"
            >
              {/* Label */}
              <span>{link.label}</span>

              {/* Arrow */}
              <span className="mobile-nav-arrow pointer-events-none ml-4 inline-block -translate-x-2 text-[24px] opacity-0">
                <ArrowUpRight />
              </span>

              {/* Underline */}
              <span className="mobile-nav-line absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-primary" />
            </Link>
          ))}
        </nav>

        {/* Bottom text */}
        <div className="absolute bottom-8 left-28 right-6 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.15em] text-gray-muted">
          <span>Navigation</span>

          <span>Menu</span>
        </div>
      </div>

      {/* =====================================================
          TABLET COMPACT MENU
          Visible: sm → lg
          ===================================================== */}

      <div
        ref={menuRef}
        className="mb-3 hidden h-0 w-48 overflow-hidden rounded-2xl border border-border-color bg-surface p-0 opacity-0 shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:block"
      >
        <nav className="flex flex-col gap-1 p-2">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(element) => {
                linksRef.current[index] = element;
              }}
              onClick={() => setIsOpen(false)}
              className="translate-y-2 rounded-xl px-4 py-3 text-[14px] font-medium text-primary-heading opacity-0 transition-colors duration-200 hover:bg-surface-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* =====================================================
          FLOATING BUTTON
          ===================================================== */}

      <button
        type="button"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        className="relative z-10 flex h-12 w-12 items-center cursor-pointer justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all duration-200 hover:bg-primary-heading active:scale-95"
      >
        <span ref={iconRef} className="relative flex h-5 w-5">
          {isOpen ? <Plus /> : <Menu />}
        </span>
      </button>
    </div>
  );
}
