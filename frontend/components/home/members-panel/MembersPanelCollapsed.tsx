"use client";

import { MessageCircle, PanelRightOpen, UsersRound } from "lucide-react";

interface MembersPanelCollapsedProps {
  activeTab: "members" | "chats";
  setActiveTab: (tab: "members" | "chats") => void;
  onToggle: () => void;
}

export default function MembersPanelCollapsed({
  activeTab,
  setActiveTab,
  onToggle,
}: MembersPanelCollapsedProps) {
  return (
    <aside className="flex h-full min-h-0 min-w-[60px] flex-col items-center overflow-hidden rounded-[16px] border border-border-color bg-surface py-4">
      {/* Open Panel */}
      <button
        onClick={onToggle}
        className="
          group relative
          flex h-10 w-10
          items-center justify-center
          rounded-[9px]
          text-gray-light
          transition-all duration-200
          hover:bg-surface-muted
        "
        aria-label="Open members panel"
        title="Open members panel"
      >
        {/* Members icon */}
        <UsersRound
          size={21}
          strokeWidth={1.9}
          className="
            transition-all duration-200
            group-hover:scale-0
            group-hover:opacity-0
          "
        />

        {/* Open icon */}
        <PanelRightOpen
          size={21}
          strokeWidth={2}
          className="
            absolute
            scale-0 opacity-0
            text-gray-muted
            transition-all duration-200
            group-hover:scale-100
            group-hover:opacity-100
          "
        />
      </button>

      {/* Divider */}
      <div className="my-5 h-px w-6 bg-[#252b36]" />

      {/* Members */}
      <button
        onClick={() => {
          setActiveTab("members");
          onToggle();
        }}
        title="Members"
        className={[
          "flex h-10 w-10 items-center justify-center rounded-[9px]",
          activeTab === "members"
            ? "bg-green-accent-muted text-white shadow-[0_0_18px_rgba(91,75,211,0.12)]"
            : "bg-surface-muted text-gray-light hover:text-gray-muted",
        ].join(" ")}
      >
        <UsersRound size={19} strokeWidth={1.9} />
      </button>

      {/* Chats */}
      <button
        onClick={() => {
          setActiveTab("chats");
          onToggle();
        }}
        title="Chats"
        className={[
          "mt-3 flex h-10 w-10 items-center justify-center rounded-[9px]",
          activeTab === "chats"
            ? "bg-green-accent-muted text-white shadow-[0_0_18px_rgba(91,75,211,0.12)]"
            : "bg-surface-muted text-gray-light hover:text-gray-muted",
        ].join(" ")}
      >
        <MessageCircle size={19} strokeWidth={1.9} />
      </button>
    </aside>
  );
}
