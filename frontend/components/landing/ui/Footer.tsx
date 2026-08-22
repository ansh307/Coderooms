"use client";

import Link from "next/link";
import { Code2 } from "lucide-react";
import { useRouter } from "next/navigation";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Use cases", href: "/#use-cases" },
    { label: "Pricing", href: "/pricing" },
  ],

  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Help Center", href: "/help" },
  ],

  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],

  Community: [
    { label: "Discord", href: "https://discord.com/users/630030470889078805" },
    { label: "GitHub", href: "https://github.com/ansh307/" },
    { label: "Twitter", href: "https://x.com/anshjz" },
  ],
};

export default function Footer() {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    // Normal links and external links
    if (!href.startsWith("#")) {
      if (href.startsWith("http")) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }

      router.push(href);
      return;
    }

    // If we're on another route, go to homepage with the hash
    if (window.location.pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    // Already on homepage — smooth scroll
    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Remove hash after scrolling starts
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
  };

  return (
    <footer className="border-t border-border-color">
      <div className="mx-auto max-w-[1180px] ">
        {/* Main */}
        <div className="grid gap-14 py-16 lg:grid-cols-[1.8fr_repeat(4,1fr)] lg:gap-10 lg:py-20">
          {/* Brand */}
          <div className="max-w-[280px]">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-surface-muted">
                <Code2 size={19} strokeWidth={2} className="text-primary" />
              </div>

              <span className="text-[19px] font-semibold tracking-[-0.035em] text-primary">
                CodeRooms
              </span>
            </Link>

            <p className="mt-6 text-[15px] leading-[1.7] text-gray-muted">
              A real-time collaborative coding environment for developers.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-light">
                {title}
              </h3>

              <ul className="mt-5 space-y-3.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-gray-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-5 border-t border-border-color py-6 sm:flex-row sm:items-center sm:justify-between py-10">
          <p className="text-[13px] text-gray-muted">
            © {new Date().getFullYear()} CodeRooms.
          </p>

          <div className="flex items-center gap-5">
            <span className="text-[13px] text-gray-muted">Made by Anshjz</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e4e6e9] text-gray-muted transition-colors hover:border-[#d4d7dc] hover:bg-[#f8f8f9] hover:text-[#111318]"
    >
      {children}
    </Link>
  );
}
