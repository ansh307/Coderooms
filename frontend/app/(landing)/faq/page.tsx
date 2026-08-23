"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is the collaborative code editor?",
    answer:
      "It is a real-time coding environment that lets you and your teammates write, edit, and run code together from anywhere. Everyone sees changes instantly without needing to configure a local development environment.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. Everything runs in your browser, so you can create a room, share the link, and start coding without installing additional software.",
  },
  {
    question: "How many people can join a room?",
    answer:
      "The number of collaborators depends on your plan. The free plan supports smaller groups, while Pro and Team plans allow you to collaborate with more people.",
  },
  {
    question: "Can I run code inside a room?",
    answer:
      "Yes. Rooms support code execution so you can write and test your code together without leaving the collaborative workspace.",
  },
  {
    question: "Can I invite someone without an account?",
    answer:
      "You can share a room link with your teammates. Depending on the room and plan settings, they can join directly or create an account to continue collaborating.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. You can start for free with no setup and upgrade whenever your team needs more collaborators, rooms, or advanced features.",
  },
  {
    question: "Can I cancel my plan anytime?",
    answer:
      "Yes. You can cancel your paid plan at any time. Your access will continue through the remainder of your current billing period.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="w-full  px-5 py-28 sm:px-8 lg:px-12 lg:pt-48 lg:pb-40"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        {/* Header */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-gray-light">
            FAQ
          </p>

          <h2 className="mt-6 max-w-[520px] text-[42px] font-semibold leading-[1.06] tracking-[-0.045em] text-primary sm:text-[52px]">
            Questions,
            <br />
            answered.
          </h2>

          <p className="mt-5 max-w-[400px] text-[17px] leading-[1.65] tracking-[-0.01em] text-gray-muted sm:text-[18px]">
            Everything you need to know about collaborating, coding, and getting
            started.
          </p>
        </div>

        {/* Questions */}
        <div className="">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="border-b border-border-color">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-8 py-6 text-left"
                >
                  <span className="text-[16px] font-medium tracking-[-0.015em] text-primary-heading transition-colors group-hover:text-primary sm:text-[17px]">
                    {faq.question}
                  </span>

                  <span
                    className={[
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-color transition-all duration-200",
                      isOpen
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface text-gray-muted group-hover:bg-surface-muted group-hover:text-primary",
                    ].join(" ")}
                  >
                    <ChevronDown
                      size={16}
                      strokeWidth={1.8}
                      className={[
                        "transition-transform duration-300",
                        isOpen ? "rotate-180" : "",
                      ].join(" ")}
                    />
                  </span>
                </button>

                <div
                  className={[
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[620px] pb-7 pr-12 text-[15px] leading-[1.7] text-gray-muted sm:text-[16px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
