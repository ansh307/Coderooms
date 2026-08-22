import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";

const posts = [
  {
    category: "Collaboration",
    title: "Why real-time collaboration makes coding better",
    description:
      "The tools we use to write software are changing. Here’s why shared coding environments are becoming a natural part of modern development.",
    date: "Aug 18, 2026",
    readTime: "5 min read",
    featured: true,
  },
  {
    category: "Engineering",
    title: "Building a fast collaborative editor",
    description:
      "What it takes to make multiple developers editing the same code feel instant.",
    date: "Aug 12, 2026",
    readTime: "7 min read",
  },
  {
    category: "Product",
    title: "The case for simpler developer tools",
    description:
      "Less setup, fewer tabs, and more time spent actually building.",
    date: "Aug 05, 2026",
    readTime: "4 min read",
  },
  {
    category: "Guides",
    title: "How to run a productive coding session with your team",
    description:
      "A simple workflow for pairing, debugging, and building together remotely.",
    date: "Jul 28, 2026",
    readTime: "6 min read",
  },
  {
    category: "Engineering",
    title: "What makes multiplayer editing feel instant?",
    description:
      "A look at the ideas behind synchronizing changes between collaborators in real time.",
    date: "Jul 21, 2026",
    readTime: "8 min read",
  },
  {
    category: "Community",
    title: "Learning to code together",
    description:
      "Why working alongside other developers can change the way you learn and solve problems.",
    date: "Jul 14, 2026",
    readTime: "5 min read",
  },
  {
    category: "Collaboration",
    title: "The power of building in public",
    description:
      "How sharing your work, getting feedback, and learning from others can help you become a better developer.",
    date: "Jul 21, 2026",
    readTime: "6 min read",
  },
];

export default function Blog() {
  const featuredPost = posts.find((post) => post.featured);
  const remainingPosts = posts.filter((post) => !post.featured);

  return (
    <main className="relative">
      {/* Header */}
      <section className="mx-auto max-w-[1180px] px-5 pb-20 pt-24 sm:px-8 sm:pt-28 lg:pb-28 lg:pt-44">
        <div className="max-w-[850px]">
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-gray-light">
            Blog
          </p>

          <h1 className="mt-7 text-[52px] font-semibold leading-[1.02] tracking-[-0.055em] text-primary sm:text-[70px] lg:text-[82px]">
            Ideas on building
            <br />
            together.
          </h1>

          <p className="mt-7 max-w-[600px] text-[18px] leading-[1.65] tracking-[-0.015em] text-primary-heading sm:text-[20px]">
            Thoughts on collaborative development, engineering, product, and
            building better tools for developers.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {featuredPost && (
        <section className="">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <Link
              href="/blog/real-time-collaboration"
              className="group grid grid-cols-1 gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:py-16"
            >
              {/* Visual */}
              <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl border border-border-color bg-surface-muted">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:32px_32px]" />

                <div className="relative w-[72%] rounded-xl border border-border-color bg-surface p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="mb-5 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#d4d6da]" />
                    <span className="h-2 w-2 rounded-full bg-[#d4d6da]" />
                    <span className="h-2 w-2 rounded-full bg-[#d4d6da]" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-2 w-[45%] rounded-full bg-primary/80" />
                    <div className="h-2 w-[70%] rounded-full bg-gray-light/50" />
                    <div className="h-2 w-[58%] rounded-full bg-gray-light/50" />
                    <div className="h-2 w-[80%] rounded-full bg-gray-light/50" />
                  </div>

                  <div className="mt-6 flex gap-2">
                    <div className="h-16 flex-1 rounded-lg bg-surface-muted" />
                    <div className="h-16 flex-1 rounded-lg bg-surface-muted" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.08em] text-gray-light">
                  <span>{featuredPost.category}</span>
                  <span className="h-1 w-1 rounded-full bg-gray-light" />
                  <span>Featured</span>
                </div>

                <h2 className="mt-5 max-w-[560px] text-[32px] font-semibold leading-[1.08] tracking-[-0.04em] text-primary-heading transition-colors group-hover:text-primary sm:text-[40px]">
                  {featuredPost.title}
                </h2>

                <p className="mt-5 max-w-[520px] text-[15px] leading-[1.7] text-gray-muted sm:text-[16px]">
                  {featuredPost.description}
                </p>

                <div className="mt-7 flex items-center gap-4 text-[13px] text-gray-muted">
                  <span>{featuredPost.date}</span>

                  <span className="h-1 w-1 rounded-full bg-gray-light" />

                  <span className="flex items-center gap-1.5">
                    <Clock3 size={13} strokeWidth={1.7} />
                    {featuredPost.readTime}
                  </span>
                </div>

                <div className="mt-8 flex items-center gap-2 text-[14px] font-medium text-primary-heading">
                  Read article
                  <ArrowRight
                    size={16}
                    strokeWidth={1.8}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Articles */}
      <section className="mx-auto max-w-[1180px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="flex items-end justify-between border-b border-border-color pb-6">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-gray-light">
              Latest
            </p>

            <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.04em] text-primary">
              From the blog
            </h2>
          </div>

          <span className="hidden text-[13px] text-gray-muted sm:block">
            {remainingPosts.length} articles
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {remainingPosts.map((post, index) => (
            <Link
              key={post.title}
              href={`/blog/${post.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")}`}
              className={[
                "group flex flex-col py-10",
                // Left/right column separation
                index % 2 === 1
                  ? "lg:border-l lg:border-border-color lg:pl-10"
                  : "lg:pr-10",

                // Border above every row after the first
                index >= 2 ? "border-t border-border-color" : "",

                // On mobile, every item after the first gets a top border
                index >= 1 ? "max-lg:border-t max-lg:border-border-color" : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.08em] text-gray-light">
                <span>{post.category}</span>
              </div>

              <h3
                className="
                    mt-5 max-w-[500px]
                    text-[24px] font-semibold leading-[1.15] tracking-[-0.035em]
                    text-primary-heading
                    transition-transform duration-300
                    dark:translate-y-25
                    dark:group-hover:translate-y-0
                "
              >
                {post.title}
              </h3>

              <p
                className="
                    mt-4 max-w-[500px]
                    text-[15px] leading-[1.7] text-gray-muted
                    transition-opacity duration-500
                    dark:opacity-0
                    dark:group-hover:delay-100
                    dark:group-hover:opacity-100
                "
              >
                {post.description}
              </p>

              <div className="mt-auto">
                <div
                  className="
                    mt-6 flex items-center gap-4
                    text-[13px] text-gray-muted
                    transition-opacity duration-500
                    dark:opacity-0
                    dark:group-hover:delay-100
                    dark:group-hover:opacity-100
                "
                >
                  <span>{post.date}</span>

                  <span className="h-1 w-1 rounded-full bg-gray-light" />

                  <span>{post.readTime}</span>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[14px] font-medium text-primary-heading">
                  Read article
                  <ArrowRight
                    size={16}
                    strokeWidth={1.8}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
