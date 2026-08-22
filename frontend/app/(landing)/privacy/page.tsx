const sections = [
  {
    title: "1. Information we collect",
    content: [
      "When you use our service, we may collect information that you provide directly to us, such as your name, email address, account details, and information you submit while using the product.",
      "We may also automatically collect limited technical information, such as your browser type, device information, IP address, and general usage activity. This helps us keep the service secure and improve the experience.",
    ],
  },
  {
    title: "2. How we use your information",
    content: [
      "We use the information we collect to provide, maintain, and improve our service. This includes creating and managing accounts, enabling collaboration, providing customer support, and communicating with you about the product.",
      "We may also use information to detect abuse, prevent fraud, protect our users, and maintain the security and reliability of the service.",
    ],
  },
  {
    title: "3. Your code and content",
    content: [
      "Content you create or upload while using the service, including code and other materials shared in collaborative rooms, is used to provide the functionality you request.",
      "We do not sell your code or personal information to third parties. Access to your content is limited to what is necessary to operate and secure the service.",
    ],
  },
  {
    title: "4. Sharing information",
    content: [
      "We may share limited information with trusted service providers that help us operate our infrastructure, authentication, analytics, communications, or other parts of the service.",
      "These providers are only given access to information necessary to perform their services and are expected to handle it appropriately.",
      "We may also disclose information when required by law or when necessary to protect the rights, safety, and security of our users or the service.",
    ],
  },
  {
    title: "5. Data security",
    content: [
      "We take reasonable measures to protect your information from unauthorized access, alteration, disclosure, or destruction.",
      "However, no online service can guarantee absolute security. If you believe your account or information has been compromised, please contact us as soon as possible.",
    ],
  },
  {
    title: "6. Data retention",
    content: [
      "We retain information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.",
      "When information is no longer required, we may delete or anonymize it in accordance with our operational and legal requirements.",
    ],
  },
  {
    title: "7. Your choices",
    content: [
      "You may update certain account information through your account settings. You may also contact us if you want to request access to, correction of, or deletion of personal information we hold about you.",
      "Some information may need to be retained where required by law or for legitimate business purposes.",
    ],
  },
  {
    title: "8. Cookies",
    content: [
      "We may use cookies and similar technologies to keep you signed in, remember preferences, understand how the service is used, and maintain security.",
      "You can control cookies through your browser settings, although disabling certain cookies may affect parts of the service.",
    ],
  },
  {
    title: "9. Changes to this policy",
    content: [
      "We may update this Privacy Policy from time to time as our service or legal requirements change.",
      "When we make significant changes, we will take reasonable steps to notify users. The updated policy will always be available on this page.",
    ],
  },
  {
    title: "10. Contact us",
    content: [
      "If you have questions about this Privacy Policy or how we handle your information, please contact us at hello@example.com.",
    ],
  },
];

export default function Privacy() {
  return (
    <main className="relative ">
      {/* Header */}
      <section className="mx-auto max-w-[1180px] px-5 pb-20 pt-24 sm:px-8 sm:pt-28 lg:pb-24 lg:pt-44">
        <div className="max-w-[850px]">
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-gray-light">
            Legal
          </p>

          <h1 className="mt-7 text-[52px] font-semibold leading-[1.02] tracking-[-0.055em] text-primary sm:text-[70px] lg:text-[82px]">
            Privacy Policy
          </h1>

          <p className="mt-7 max-w-[620px] text-[18px] leading-[1.65] tracking-[-0.015em] text-primary-heading sm:text-[20px]">
            We care about your privacy and want to be clear about what
            information we collect, why we collect it, and how we use it.
          </p>

          <div className="mt-8 flex items-center gap-3 text-[13px] text-gray-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Last updated: August 22, 2026
          </div>
        </div>
      </section>

      {/* Policy */}
      <section className="w-full px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-16 lg:grid-cols-[0.55fr_1.45fr] lg:gap-24">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-40 lg:self-start">
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-gray-light">
              On this page
            </p>

            <nav className="mt-6 hidden space-y-3 lg:block">
              {sections.map((section) => (
                <a
                  key={section.title}
                  href={`#${section.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}`}
                  className="block max-w-[220px] text-[13px] leading-[1.5] text-gray-muted transition-colors hover:text-primary"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <article className="max-w-[720px]">
            <div className="mb-12 border-b border-border-color pb-10">
              <p className="text-[16px] leading-[1.75] text-primary-heading">
                This Privacy Policy explains how we collect, use, store, and
                protect information when you use our collaborative coding
                platform.
              </p>
            </div>

            <div className="space-y-14">
              {sections.map((section) => {
                const id = section.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-");

                return (
                  <section key={section.title} id={id}>
                    <h2 className="text-[21px] font-semibold tracking-[-0.025em] text-primary-heading sm:text-[23px]">
                      {section.title}
                    </h2>

                    <div className="mt-5 space-y-4">
                      {section.content.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-[15px] leading-[1.8] text-gray-muted sm:text-[16px]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </article>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="mx-auto max-w-[1180px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="flex flex-col justify-between gap-8 pt-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-[14px] font-medium text-primary-heading">
              Have questions about your privacy?
            </p>

            <p className="mt-1 text-[14px] text-gray-muted">
              We’re happy to help clarify anything.
            </p>
          </div>

          <a
            href="mailto:hello@example.com"
            className="group inline-flex items-center gap-3 text-[15px] font-medium text-primary-heading"
          >
            <span className="border-b border-border-color pb-1 transition-colors group-hover:border-primary group-hover:text-primary">
              Contact us
            </span>

            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
