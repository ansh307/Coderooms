"use client";

import { Mail, MessageSquare, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="relative">
      {/* Header */}
      <section className="mx-auto max-w-[1180px] px-5 pb-20 pt-24 sm:px-8 sm:pt-28 lg:pb-24 lg:pt-44">
        <div className="max-w-[800px]">
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-gray-light">
            Contact
          </p>

          <h1 className="mt-7 text-[52px] font-semibold leading-[1.02] tracking-[-0.055em] text-primary sm:text-[70px] lg:text-[82px]">
            Let’s talk.
          </h1>

          <p className="mt-7 max-w-[580px] text-[18px] leading-[1.65] tracking-[-0.015em] text-primary-heading sm:text-[20px]">
            Have a question, feedback, or just want to say hello? Send us a
            message and we’ll get back to you.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="w-full  px-5 pt-16 pb-10 sm:py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          {/* Info */}
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-gray-light">
              Get in touch
            </p>

            <div className="mt-8 space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-primary-heading">
                  <Mail size={18} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-[14px] font-medium text-primary-heading">
                    Email
                  </p>

                  <a
                    href="mailto:hello@example.com"
                    className="mt-1 block text-[14px] text-gray-muted transition-colors hover:text-primary"
                  >
                    hello@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-primary-heading">
                  <MessageSquare size={18} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-[14px] font-medium text-primary-heading">
                    Support
                  </p>

                  <p className="mt-1 max-w-[240px] text-[14px] leading-[1.6] text-gray-muted">
                    Need help with your account or a room? We’re happy to help.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6">
              <p className="text-[13px] leading-[1.6] text-gray-muted">
                We usually respond within 1–2 business days.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center pt-20 px-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Mail size={20} strokeWidth={1.8} />
                </div>

                <h2 className="mt-6 text-[24px] font-semibold tracking-[-0.03em] text-primary-heading">
                  Message sent.
                </h2>

                <p className="mt-3 max-w-[400px] text-[15px] leading-[1.65] text-gray-muted">
                  Thanks for reaching out. We’ve received your message and will
                  get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="">
                {/* Name */}
                <div className="border-b border-border-color py-6">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-[12px] font-medium uppercase tracking-[0.08em] text-gray-light"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full bg-transparent text-[16px] text-primary-heading outline-none placeholder:text-gray-light"
                  />
                </div>

                {/* Email */}
                <div className="border-b border-border-color py-6">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-[12px] font-medium uppercase tracking-[0.08em] text-gray-light"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-[16px] text-primary-heading outline-none placeholder:text-gray-light"
                  />
                </div>

                {/* Subject */}
                <div className="border-b border-border-color py-6">
                  <label
                    htmlFor="subject"
                    className="mb-3 block text-[12px] font-medium uppercase tracking-[0.08em] text-gray-light"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="What can we help with?"
                    className="w-full bg-transparent text-[16px] text-primary-heading outline-none placeholder:text-gray-light"
                  />
                </div>

                {/* Message */}
                <div className="border-b border-border-color py-6">
                  <label
                    htmlFor="message"
                    className="mb-3 block text-[12px] font-medium uppercase tracking-[0.08em] text-gray-light"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us a little more..."
                    className="w-full resize-none bg-transparent text-[16px] leading-[1.6] text-primary-heading outline-none placeholder:text-gray-light"
                  />
                </div>

                {/* Submit */}
                <div className="pt-7">
                  <button
                    type="submit"
                    className="group inline-flex h-11 items-center justify-center gap-3 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-all hover:bg-primary-heading hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
                  >
                    Send message
                    <ArrowRight
                      size={17}
                      strokeWidth={1.9}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
