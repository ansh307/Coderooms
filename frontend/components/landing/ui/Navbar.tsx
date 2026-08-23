"use client";

import Link from "next/link";
import { Code2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileNav from "./MobileNav";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const router = useRouter();

  const handleNavigation = (href: string) => {
    if (!href.startsWith("#")) {
      router.push(href);
      return;
    }

    if (window.location.pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-998 px-4 pt-5 sm:px-6 lg:px-10 transition-all duration-500 ${
          scrolled ? "pt-5" : "pt-5"
        }`}
      >
        <nav
          className={`
          mx-auto flex items-center justify-between
          border border-border-color
          bg-surface-muted backdrop-blur
          
          transition-all duration-500 ease-out

          ${
            scrolled
              ? "h-16 max-w-[850px] rounded-full px-5 shadow-xl"
              : "h-16 max-w-[1350px] rounded-full px-5 shadow-sm"
          }
        `}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className={`
              flex items-center justify-center
              bg-surface-muted
              transition-all duration-500
              ${scrolled ? "h-7 w-7 rounded-full" : "h-8 w-8 rounded-[9px]"}
            `}
            >
              <Code2
                size={scrolled ? 16 : 18}
                strokeWidth={2}
                className="text-primary"
              />
            </div>

            <span
              className={`
              font-semibold tracking-[-0.035em] text-primary
              transition-all duration-500
              ${scrolled ? "text-[16px]" : "text-[18px]"}
            `}
            >
              CodeRooms
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavigation(link.href)}
                className="text-[13px] font-medium text-primary-not-selected transition-colors hover:text-primary cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-[13px] font-medium text-primary-not-selected transition-colors hover:text-primary sm:block"
            >
              Sign in
            </Link>

            <Link
              href="/signup"
              className={`
              inline-flex items-center justify-center
              bg-primary font-medium text-primary-foreground
              transition-all duration-500
              hover:bg-primary-heading
              ${
                scrolled
                  ? "h-8 rounded-full px-5 text-[12px]"
                  : "h-10 rounded-full px-5 text-[14px]"
              }
            `}
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <MobileNav />
    </>
  );
}
