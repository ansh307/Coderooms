const sections = [
  {
    title: "1. Acceptance of these terms",
    content: [
      "By accessing or using our service, you agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use the service.",
      "If you are using the service on behalf of a company, organization, or another entity, you confirm that you have the authority to accept these terms on its behalf.",
    ],
  },
  {
    title: "2. Using the service",
    content: [
      "Our service provides tools for creating collaborative coding rooms, sharing code, working with other users, and related development activities.",
      "You agree to use the service only for lawful purposes and in accordance with these terms. You are responsible for your activity and the content you create, upload, or share.",
    ],
  },
  {
    title: "3. Your account",
    content: [
      "Some features may require you to create an account. You are responsible for keeping your account credentials secure and for all activity that occurs through your account.",
      "You agree to provide accurate information and to keep your account information reasonably up to date.",
      "If you believe someone has accessed your account without permission, you should notify us promptly.",
    ],
  },
  {
    title: "4. Your content",
    content: [
      "You retain ownership of the code, files, and other content that you submit to the service.",
      "By using the service, you grant us the limited rights necessary to host, process, display, transmit, and otherwise handle your content solely to provide and improve the functionality of the service.",
      "You are responsible for ensuring that you have the necessary rights to any content you upload or share.",
    ],
  },
  {
    title: "5. Acceptable use",
    content: [
      "You may not use the service to violate applicable laws, infringe the rights of others, distribute malicious software, attempt to gain unauthorized access, interfere with the service, or abuse other users.",
      "You may not use the service to create, distribute, or execute content that is intended to compromise the security or availability of systems without appropriate authorization.",
      "We reserve the right to investigate suspected violations and take appropriate action when necessary.",
    ],
  },
  {
    title: "6. Collaboration and shared rooms",
    content: [
      "Rooms are designed for collaboration. When you invite other people to a room, content shared within that room may be accessible to those participants.",
      "You are responsible for choosing who you invite and for ensuring that you do not share confidential or sensitive information with people who should not have access to it.",
    ],
  },
  {
    title: "7. Paid plans and billing",
    content: [
      "Certain features may require a paid subscription. Pricing, billing intervals, and included features are presented at the time of purchase.",
      "Paid subscriptions may automatically renew unless cancelled before the next billing period.",
      "Unless otherwise required by applicable law, payments are generally non-refundable for the period in which the service was provided.",
    ],
  },
  {
    title: "8. Intellectual property",
    content: [
      "The service, including its design, software, branding, documentation, and other materials provided by us, is owned by us or our licensors and is protected by applicable intellectual property laws.",
      "These terms do not grant you ownership of our intellectual property. You receive only the rights necessary to use the service as permitted by these terms.",
    ],
  },
  {
    title: "9. Third-party services",
    content: [
      "The service may rely on or integrate with third-party services. Those services may have their own terms and privacy policies.",
      "We are not responsible for the availability, functionality, or policies of third-party services that we do not control.",
    ],
  },
  {
    title: "10. Availability and changes",
    content: [
      "We work to keep the service reliable and available, but we do not guarantee that it will always be uninterrupted, secure, or error-free.",
      "We may modify, suspend, or discontinue parts of the service from time to time. We may also release new features or change existing functionality.",
    ],
  },
  {
    title: "11. Termination",
    content: [
      "You may stop using the service at any time. We may suspend or terminate access if you violate these terms, create a security risk, abuse the service, or otherwise use the service in a way that could harm us or others.",
      "After termination, certain provisions of these terms may continue to apply where their nature requires them to survive termination.",
    ],
  },
  {
    title: "12. Disclaimers",
    content: [
      "To the maximum extent permitted by law, the service is provided on an 'as is' and 'as available' basis without warranties of any kind, whether express or implied.",
      "We do not guarantee that the service will meet every requirement, operate without interruption, or be free from errors or defects.",
    ],
  },
  {
    title: "13. Limitation of liability",
    content: [
      "To the maximum extent permitted by applicable law, we will not be liable for indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the service.",
      "Nothing in these terms is intended to exclude or limit liability where doing so would not be permitted by applicable law.",
    ],
  },
  {
    title: "14. Changes to these terms",
    content: [
      "We may update these Terms of Service from time to time. When changes are made, we will update the date shown on this page and may provide additional notice when appropriate.",
      "Your continued use of the service after updated terms become effective means you accept the revised terms.",
    ],
  },
  {
    title: "15. Contact",
    content: [
      "If you have questions about these Terms of Service, please contact us at hello@example.com.",
    ],
  },
];

export default function Terms() {
  return (
    <main className="relative">
      {/* Header */}
      <section className="mx-auto max-w-[1180px] px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-44">
        <div className="max-w-[850px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-gray-light sm:text-[12px]">
            Legal
          </p>

          <h1 className="mt-5 text-[44px] font-semibold leading-[1.02] tracking-[-0.055em] text-primary sm:mt-7 sm:text-[70px] lg:text-[82px]">
            Terms of Service
          </h1>

          <p className="mt-6 max-w-[620px] text-[17px] leading-[1.65] tracking-[-0.015em] text-primary-heading sm:mt-7 sm:text-[20px]">
            These terms explain the rules and responsibilities that apply when
            you use our service.
          </p>

          <div className="mt-7 flex items-center gap-3 text-[12px] text-gray-muted sm:mt-8 sm:text-[13px]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>Last updated: August 22, 2026</span>
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="w-full px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 sm:gap-16 lg:grid-cols-[0.55fr_1.45fr] lg:gap-24">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-40 lg:self-start">
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-gray-light sm:text-[12px]">
              On this page
            </p>

            {/* Mobile */}
            <div className="mt-5 space-y-3 lg:hidden">
              {sections.map((section) => (
                <a
                  key={section.title}
                  href={`#${section.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}`}
                  className="block text-[13px] leading-[1.5] text-gray-muted transition-colors hover:text-primary"
                >
                  {section.title}
                </a>
              ))}
            </div>

            {/* Desktop */}
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
            <div className="mb-10 border-b border-border-color pb-8 sm:mb-12 sm:pb-10">
              <p className="text-[15px] leading-[1.75] text-primary-heading sm:text-[16px]">
                By using our service, you agree to these Terms of Service.
                Please read them carefully before creating an account or using
                any collaborative coding features.
              </p>
            </div>

            <div className="space-y-12 sm:space-y-14">
              {sections.map((section) => {
                const id = section.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-");

                return (
                  <section
                    key={section.title}
                    id={id}
                    className="scroll-mt-24 lg:scroll-mt-40"
                  >
                    <h2 className="text-[20px] font-semibold tracking-[-0.025em] text-primary-heading sm:text-[23px]">
                      {section.title}
                    </h2>

                    <div className="mt-4 space-y-4 sm:mt-5">
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
      <section className="mx-auto max-w-[1180px] px-5 pt-10 pb-10 sm:px-8 sm:py-24 lg:py-32">
        <div className="flex flex-col justify-between gap-7 pt-6 sm:flex-row sm:items-center sm:gap-8 sm:pt-8">
          <div>
            <p className="text-[14px] font-medium text-primary-heading">
              Have questions about these terms?
            </p>

            <p className="mt-1 text-[14px] text-gray-muted">
              Get in touch and we’ll be happy to help.
            </p>
          </div>

          <a
            href="mailto:hello@example.com"
            className="group inline-flex w-fit items-center gap-3 text-[15px] font-medium text-primary-heading"
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
