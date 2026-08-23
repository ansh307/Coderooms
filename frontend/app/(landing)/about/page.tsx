import Link from "next/link";
import { ArrowRight, Code2, Globe2, UsersRound } from "lucide-react";

const values = [
  {
    icon: Code2,
    title: "Build together",
    description:
      "Great software is rarely built alone. We make collaboration a natural part of writing code.",
  },
  {
    icon: UsersRound,
    title: "Keep it simple",
    description:
      "No complicated setup or unnecessary tools. Open a room, invite your team, and start building.",
  },
  {
    icon: Globe2,
    title: "Work anywhere",
    description:
      "Your team should be able to collaborate from wherever they are, without being tied to one machine.",
  },
];

export default function About() {
  return (
    <main className="relative">
      {/* Intro */}
      <section className="mx-auto max-w-[1180px] px-5 pb-24 pt-24 sm:px-8 sm:pt-28 lg:pb-32 lg:pt-44">
        <div className="max-w-[900px]">
          <h1 className="mt-7 text-[52px] font-semibold leading-[1.02] tracking-[-0.055em] text-primary sm:text-[70px] lg:text-[82px]">
            We believe coding
            <br />
            is better together.
          </h1>

          <p className="mt-8 max-w-[650px] text-[18px] leading-[1.65] tracking-[-0.015em] text-primary-heading sm:text-[20px]">
            We’re building a simpler way for developers to collaborate, learn,
            and build software together in real time.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="w-full px-5 pt-16 pb-10 sm:py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-[72px] lg:text-[108px] font-semibold  leading-[1.02] tracking-[-0.055em] text-gray-light">
              Why we started?
            </p>
          </div>

          <div className="max-w-[680px]">
            <p className="text-[25px] font-medium leading-[1.35] tracking-[-0.025em] text-primary-heading sm:text-[30px]">
              Coding is already collaborative. The tools we use should be too.
            </p>

            <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-gray-muted sm:text-[17px]">
              <p>
                Working with other developers often means switching between
                editors, terminals, chat apps, and video calls. We wanted to
                make that experience feel much more natural.
              </p>

              <p>
                So we built a shared coding space where teams can open a room,
                invite others, and start building together instantly.
              </p>

              <p>
                Our goal is simple: remove the friction between an idea and the
                people building it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        id="values"
        className="mx-auto max-w-[1180px] px-5 py-24 sm:px-8 lg:py-32"
      >
        <div className="max-w-[650px]">
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-gray-light">
            What we care about
          </p>

          <h2 className="mt-6 text-[42px] font-semibold leading-[1.08] tracking-[-0.045em] text-primary sm:text-[52px]">
            Simple ideas.
            <br />
            Thoughtful tools.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 border-y border-border-color lg:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className={[
                  "group py-10 lg:px-10 lg:py-12",
                  index !== 0
                    ? "border-t border-border-color lg:border-l lg:border-t-0"
                    : "",
                ].join(" ")}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-primary-heading transition-colors duration-200 group-hover:bg-surface-muted group-hover:text-primary">
                  <Icon size={19} strokeWidth={1.7} />
                </div>

                <h3 className="mt-7 text-[20px] font-semibold tracking-[-0.03em] text-primary-heading">
                  {value.title}
                </h3>

                <p className="mt-3 max-w-[280px] text-[15px] leading-[1.65] text-gray-muted">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="">
        <div className="mx-auto max-w-[1180px] px-5 py-24 text-center sm:px-8 lg:py-32">
          <h2 className="mx-auto max-w-[700px] text-[42px] font-semibold leading-[1.05] tracking-[-0.05em] text-primary sm:text-[56px]">
            Let’s build something together.
          </h2>

          <p className="mx-auto mt-5 max-w-[500px] text-[17px] leading-[1.65] text-gray-muted">
            Create a room, invite your team, and start coding together.
          </p>

          <Link
            href="/signup"
            className="group mt-8 inline-flex h-11 items-center gap-3 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-all hover:bg-primary-heading hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
          >
            Get started free
            <ArrowRight
              size={17}
              strokeWidth={1.9}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
