import { Code2 } from "lucide-react";

interface CodeEditorJoinProps {
  joining: boolean;
  onJoin: () => void;
}

export default function CodeEditorJoin({
  joining,
  onJoin,
}: CodeEditorJoinProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-[380px] px-6 text-center">
        <div
          className="
            mx-auto flex h-12 w-12
            items-center justify-center
            rounded-[12px]
            bg-surface-muted
            text-green-accent
          "
        >
          <Code2 size={23} strokeWidth={2} />
        </div>

        <h2 className="mt-5 text-[17px] font-semibold text-primary-heading">
          Join this CodeRoom
        </h2>

        <p className="mt-2 text-[13px] leading-5 text-gray-muted">
          You are not a member of this public CodeRoom. Join the room to view
          and collaborate on the code.
        </p>

        <button
          onClick={onJoin}
          disabled={joining}
          className="
            mt-6
            h-11
            rounded-[9px]
            bg-green-accent
            px-6
            text-[14px]
            font-medium
            text-white
            transition-opacity
            hover:opacity-90
            disabled:pointer-events-none
            disabled:opacity-50
          "
        >
          {joining ? "Joining..." : "Join CodeRoom"}
        </button>
      </div>
    </div>
  );
}
