import { GraduationCap, Laptop, Users, UsersRound } from "lucide-react";

const useCases = [
  {
    icon: UsersRound,
    title: "Pair programming",
    description:
      "Code together in real time, share ideas, and solve problems faster.",
  },
  {
    icon: Laptop,
    title: "Interviews",
    description:
      "Conduct technical interviews in a collaborative environment that feels natural.",
  },
  {
    icon: GraduationCap,
    title: "Teaching",
    description:
      "Teach and learn by doing. Students can code, run, and get help instantly.",
  },
  {
    icon: Users,
    title: "Team collaboration",
    description:
      "Work on projects together with your team and ship better code.",
  },
];

export default function UseCases() {
  return (
    <section
      id="use-cases"
      className="w-full px-5 py-24 sm:px-8 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Header */}
        <div className="max-w-[720px] ">
          <h2 className="mt-7 max-w-[700px] text-[42px] font-semibold leading-[1.08] tracking-[-0.045em] text-primary sm:text-[52px] lg:text-[56px]">
            Built for the way
            <br className="hidden sm:block" />
            developers work together.
          </h2>

          <p className="mt-5 max-w-[600px] text-[17px] leading-[1.65] tracking-[-0.01em] text-gray-muted sm:text-[18px]">
            From pair sessions to team projects, CodeRooms fits naturally into
            your workflow.
          </p>
        </div>

        {/* Use Cases */}
        <div className="mt-20 grid grid-cols-1 border-y border-border-color md:grid-cols-2">
          {useCases.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={[
                  "group px-6 py-10 sm:px-8 sm:py-20 lg:px-10",
                  index % 2 === 1 ? "md:border-l md:border-border-color" : "",
                  index >= 2 ? "border-t border-border-color" : "",
                ].join(" ")}
              >
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-primary-heading transition-colors duration-200 group-hover:bg-surface-muted group-hover:text-primary">
                    <Icon size={19} strokeWidth={1.7} />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-[20px] font-semibold tracking-[-0.03em]  text-primary-heading">
                      {item.title}
                    </h3>

                    <p
                      className="mt-3 max-w-[420px] text-[15px] leading-[1.7]  transition-opacity duration-500
                            dark:opacity-0
                            dark:group-hover:opacity-100"
                    >
                      {item.description}
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
