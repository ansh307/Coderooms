"use client";

import { PanelRightClose } from "lucide-react";

interface MembersPanelHeaderProps {
  activeTab: "members" | "chats";
  setActiveTab: (tab: "members" | "chats") => void;
  onToggle: () => void;
}

export default function MembersPanelHeader({
  activeTab,
  setActiveTab,
  onToggle,
}: MembersPanelHeaderProps) {
  return (
    <div className="flex h-[74px] shrink-0 border-b border-border-color">
      {/* Members */}
      <button
        onClick={() => setActiveTab("members")}
        className={[
          "relative flex flex-1 items-center justify-center",
          "text-[19px] font-medium transition-colors",
          activeTab === "members"
            ? "text-green-accent"
            : "text-green-accent hover:text-green-accent-muted",
        ].join(" ")}
      >
        Members
        {activeTab === "members" && (
          <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-green-accent" />
        )}
      </button>

      {/* Chats */}
      <button
        onClick={() => setActiveTab("chats")}
        className={[
          "relative flex flex-1 items-center justify-center",
          "text-[19px] font-medium transition-colors",
          activeTab === "chats"
            ? "text-green-accent"
            : "text-green-accent hover:text-green-accent-muted",
        ].join(" ")}
      >
        Chats
        {activeTab === "chats" && (
          <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-green-accent" />
        )}
      </button>

      {/* Collapse */}
      <button
        onClick={onToggle}
        className="
          mr-3
          flex h-9 w-9
          items-center justify-center
          self-center
          rounded-[8px]
          text-gray-muted
          hover:bg-surface-muted
          hover:text-primary-heading
        "
        aria-label="Collapse members panel"
        title="Collapse members panel"
      >
        <PanelRightClose size={20} strokeWidth={1.9} />
      </button>
    </div>
  );
}
