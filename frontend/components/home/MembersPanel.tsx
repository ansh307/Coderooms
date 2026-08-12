"use client";

import {
  UserPlus,
  UsersRound,
  MessageCircle,
  PanelRightOpen,
  PanelRightClose,
} from "lucide-react";
import { useState } from "react";

interface MembersPanelProps {
  open: boolean;
  onToggle: () => void;
}

export default function MembersPanel({ open, onToggle }: MembersPanelProps) {
  const [activeTab, setActiveTab] = useState<"members" | "chats">("members");

  /*
   * COLLAPSED
   */
  if (!open) {
    return (
      <aside className="flex h-full min-h-0 min-w-[60px] flex-col items-center overflow-hidden rounded-[16px] border border-[#262d3a] bg-surface py-4">
        {/* Open Panel */}
        <button
          onClick={onToggle}
          className="
            group relative
            flex h-10 w-10
            items-center justify-center
            rounded-[9px]
            text-[#aeb4c0]
            transition-all duration-200
            hover:bg-surface-muted
            hover:text-white
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
              text-[#d8dce5]
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
            "transition-all duration-200",
            activeTab === "members"
              ? "bg-green-accent-muted text-white shadow-[0_0_18px_rgba(91,75,211,0.12)]"
              : "bg-surface-muted text-[#aeb4c0]  hover:text-white",
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
            "transition-all duration-200",
            activeTab === "chats"
              ? "bg-green-accent-muted text-white shadow-[0_0_18px_rgba(91,75,211,0.12)]"
              : "bg-surface-muted text-[#aeb4c0]  hover:text-white",
          ].join(" ")}
        >
          <MessageCircle size={19} strokeWidth={1.9} />
        </button>
      </aside>
    );
  }

  /*
   * EXPANDED
   */
  return (
    <aside className="flex h-full min-w-0 flex-col overflow-hidden rounded-[16px] border border-[#262d3a] bg-surface">
      {/* Tabs */}
      <div className="flex h-[74px] shrink-0 border-b border-[#252b36]">
        {/* Members */}
        <button
          onClick={() => setActiveTab("members")}
          className={[
            "relative flex flex-1 items-center justify-center",
            "text-[21px] font-medium transition-colors",
            activeTab === "members"
              ? "text-green-accent"
              : "text-green-accent hover:text-green-accent-muted",
          ].join(" ")}
        >
          Members
          {activeTab === "members" && (
            <span className="absolute bottom-0 left-4 right-4 h-[3px] rounded-full bg-green-accent" />
          )}
        </button>

        {/* Chats */}
        <button
          onClick={() => setActiveTab("chats")}
          className={[
            "relative flex flex-1 items-center justify-center",
            "text-[21px] font-medium transition-colors",
            activeTab === "chats"
              ? "text-green-accent"
              : "text-green-accent hover:text-green-accent-muted",
          ].join(" ")}
        >
          Chats
          {activeTab === "chats" && (
            <span className="absolute bottom-0 left-4 right-4 h-[3px] rounded-full bg-green-accent" />
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
            text-[#858c9b]
            transition-all duration-200
            hover:bg-surface-muted
            hover:text-[#e5e7eb]
          "
          aria-label="Collapse members panel"
          title="Collapse members panel"
        >
          <PanelRightClose size={20} strokeWidth={1.9} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center px-8">
        {activeTab === "members" ? (
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center">
              <UsersRound
                size={53}
                strokeWidth={1.7}
                className="text-green-accent"
              />
            </div>

            <h2 className="max-w-[270px] text-[27px] font-semibold leading-[1.35] tracking-[-0.02em] text-[#dce0e8]">
              Invite people to
              <br />
              start chat
            </h2>

            <button
              className="
                mt-6 flex h-[56px]
                items-center gap-3
                rounded-[11px]
                border border-border-color
                bg-green-accent-muted
                px-6
                text-[16px]
                font-medium
                text-white
                transition-all
                hover:brightness-110
              "
            >
              <UserPlus size={21} strokeWidth={1.8} />
              Invite Members
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <MessageCircle
              size={52}
              strokeWidth={1.6}
              className="mb-5 text-green-accent"
            />

            <h2 className="text-[23px] font-semibold text-[#dce0e8]">
              No conversations
            </h2>

            <p className="mt-2 max-w-[250px] text-[14px] leading-6 text-[#858c9b]">
              Start a conversation with your room members.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
