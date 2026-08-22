"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  MessageCircle,
  Search,
  Settings2,
  UsersRound,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const categories = [
  {
    icon: BookOpen,
    title: "Getting started",
    description: "Learn the basics and start collaborating in your first room.",
    href: "#getting-started",
  },
  {
    icon: Code2,
    title: "Coding & rooms",
    description: "Learn how rooms, code execution, and collaboration work.",
    href: "#coding",
  },
  {
    icon: UsersRound,
    title: "Collaboration",
    description: "Invite teammates and work together in real time.",
    href: "#collaboration",
  },
  {
    icon: Settings2,
    title: "Account & settings",
    description: "Manage your account, preferences, and subscription.",
    href: "#account",
  },
];

const popularQuestions = [
  {
    question: "How do I create a room?",
    answer:
      "Create a new room from your dashboard and share the room link with anyone you want to collaborate with.",
  },
  {
    question: "How do I invite someone to my room?",
    answer:
      "Open your room and copy the invite link. Send it to your teammate and they can use the link to join.",
  },
  {
    question: "Can multiple people edit code at the same time?",
    answer:
      "Yes. Everyone in the room can edit the code in real time, allowing your team to work together from different locations.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. The collaborative editor works directly in your browser, so you can start coding without installing a desktop application.",
  },
];

export default function Help() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }

      if (event.key === "Escape") {
        setQuery("");
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const normalizedQuery = debouncedQuery.trim().toLowerCase();

  const filteredQuestions = popularQuestions.filter((item) => {
    if (!normalizedQuery) return true;

    return (
      item.question.toLowerCase().includes(normalizedQuery) ||
      item.answer.toLowerCase().includes(normalizedQuery)
    );
  });

  const searchResults = normalizedQuery
    ? popularQuestions.filter((item) => {
        return (
          item.question.toLowerCase().includes(normalizedQuery) ||
          item.answer.toLowerCase().includes(normalizedQuery)
        );
      })
    : [];

  return (
    <main className="relative">
      {/* Hero */}
      <section className="mx-auto max-w-[1180px] px-5 pb-20 pt-24 text-center sm:px-8 sm:pt-28 lg:pb-28 lg:pt-44">
        <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-gray-light">
          Help center
        </p>

        <h1 className="mx-auto mt-7 max-w-[850px] text-[52px] font-semibold leading-[1.02] tracking-[-0.055em] text-primary sm:text-[70px] lg:text-[82px]">
          How can we help?
        </h1>

        <p className="mx-auto mt-7 max-w-[570px] text-[18px] leading-[1.65] tracking-[-0.015em] text-primary-heading sm:text-[20px]">
          Find answers, learn how things work, and get the most out of your
          collaborative coding workspace.
        </p>

        {/* Search */}
        <div className="relative mx-auto mt-10 max-w-[580px]">
          <div className="flex h-13 items-center gap-3 rounded-full border border-border-color bg-surface px-5 transition-colors focus-within:border-primary">
            <Search
              size={18}
              strokeWidth={1.7}
              className="shrink-0 text-gray-muted"
            />

            <input
              type="text"
              value={query}
              ref={searchInputRef}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for an answer..."
              className="h-full w-full bg-transparent text-[15px] text-primary-heading outline-none placeholder:text-gray-light"
              aria-label="Search help articles"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="shrink-0 text-[13px] text-gray-muted transition-colors hover:text-primary"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}

            <kbd className="hidden rounded-md border border-border-color bg-surface-muted px-2 py-1 font-mono text-[10px] text-gray-light sm:block">
              /
            </kbd>
          </div>

          {normalizedQuery && (
            <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-20 overflow-hidden rounded-2xl border border-border-color bg-surface shadow-lg">
              {searchResults.length > 0 ? (
                <div className="divide-y divide-border-color">
                  <div className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-gray-light">
                    {searchResults.length}{" "}
                    {searchResults.length === 1 ? "result" : "results"}
                  </div>

                  {searchResults.map((item) => (
                    <button
                      key={item.question}
                      type="button"
                      onClick={() => {
                        document
                          .getElementById(
                            `question-${item.question
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-")}`,
                          )
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                      }}
                      className="group block w-full px-5 py-4 text-left transition-colors hover:bg-surface-muted"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[14px] font-medium text-primary-heading">
                          {item.question}
                        </span>

                        <ArrowRight
                          size={15}
                          strokeWidth={1.8}
                          className="shrink-0 text-gray-muted transition-transform group-hover:translate-x-1"
                        />
                      </div>

                      <p className="mt-1 line-clamp-2 text-[13px] leading-[1.6] text-gray-muted">
                        {item.answer}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-6 text-left">
                  <p className="text-[14px] font-medium text-primary-heading">
                    No results found
                  </p>

                  <p className="mt-1 text-[13px] text-gray-muted">
                    Try searching for something like “room”, “invite”, or
                    “code”.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="w-full  px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid grid-cols-1 border-y border-border-color lg:grid-cols-4">
            {categories.map((category, index) => {
              const Icon = category.icon;

              return (
                <a
                  key={category.title}
                  href={category.href}
                  className={[
                    "group block py-9 lg:px-7 lg:py-11",
                    index !== 0
                      ? "border-t border-border-color lg:border-l lg:border-t-0"
                      : "",
                  ].join(" ")}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-primary-heading transition-colors duration-200 group-hover:bg-surface-muted group-hover:text-primary">
                    <Icon size={19} strokeWidth={1.7} />
                  </div>

                  <h2 className="mt-7 text-[18px] font-semibold tracking-[-0.025em] text-primary-heading">
                    {category.title}
                  </h2>

                  <p className="mt-3 max-w-[230px] text-[14px] leading-[1.65] text-gray-muted">
                    {category.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-[13px] font-medium text-primary-heading">
                    Explore
                    <ArrowRight
                      size={15}
                      strokeWidth={1.8}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular questions */}
      <section className="mx-auto max-w-[1180px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-gray-light">
              Common questions
            </p>

            <h2 className="mt-6 text-[40px] font-semibold leading-[1.08] tracking-[-0.045em] text-primary sm:text-[50px]">
              Quick answers
              <br />
              to common questions.
            </h2>
          </div>

          <div className="border-t border-border-color">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((item) => (
                <details
                  key={item.question}
                  id={`question-${item.question
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}`}
                  className="group border-b border-border-color"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[16px] font-medium text-primary-heading [&::-webkit-details-marker]:hidden">
                    {item.question}

                    <span className="text-[20px] font-light text-gray-muted transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <p className="max-w-[620px] pb-7 pr-10 text-[15px] leading-[1.7] text-gray-muted">
                    {item.answer}
                  </p>
                </details>
              ))
            ) : (
              <div className="border-b border-border-color py-8">
                <p className="text-[15px] text-gray-muted">
                  No matching questions found.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
