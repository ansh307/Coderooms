"use client";

import { Code2, Hash, Settings, PanelLeftOpen } from "lucide-react";

interface SidebarCollapsedProps {
  activeRoom: any;
  onToggle: () => void;
  onSetActiveRoom: (room: any) => void;
  onCreateRoom: () => void;
}

export default function SidebarCollapsed({
  activeRoom,
  onToggle,
  onSetActiveRoom,
  onCreateRoom,
}: SidebarCollapsedProps) {
  return (
    <aside className="flex h-full min-h-0 min-w-[60px] flex-col items-center overflow-hidden rounded-[16px] border border-border-color bg-surface py-4">
      {/* Logo / Open Sidebar */}
      <button
        onClick={onToggle}
        className="
          group relative
          flex h-10 w-10 items-center justify-center
          rounded-[9px]
          transition-all duration-200
          hover:bg-surface-muted
        "
        aria-label="Open sidebar"
        title="Open sidebar"
      >
        {/* Logo */}
        <Code2
          size={22}
          strokeWidth={2.3}
          className="
            text-green-accent
            transition-all duration-200
            group-hover:scale-0
            group-hover:opacity-0
          "
        />

        {/* Open icon */}
        <PanelLeftOpen
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

      {/* Small divider */}
      <div className="my-5 h-px w-6 bg-border border-border-color " />

      {/* Active Room Only */}
      <button
        onClick={() => onSetActiveRoom(activeRoom)}
        title={activeRoom?.name}
        className="
          relative
          flex h-10 w-10
          items-center justify-center
          rounded-[9px]
          border border-green-accent-muted
          bg-surface-muted
          text-[#d8dce5]
          shadow-[0_0_18px_rgba(91,75,211,0.08)]
          transition-all duration-200
        "
      >
        <Hash size={20} strokeWidth={2} />

        {/* Online indicator */}
        <span
          className="
            absolute
            right-[-2px]
            top-[-2px]
            h-[9px]
            w-[9px]
            rounded-full
            border-2
            border-[#10141b]
            bg-[#65c97b]
          "
        />
      </button>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col items-center gap-3">
        {/* My CodeRoom */}
        <button
          title="My CodeRoom"
          onClick={onCreateRoom}
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-[9px]
            text-[#aeb4c0]
            transition-all duration-200
            bg-surface-muted
            hover:text-white
          "
        >
          +
        </button>

        {/* Settings */}
        <button
          title="Settings"
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-[9px]
            text-[#aeb4c0]
            transition-all duration-200
            hover:bg-surface-muted
            hover:text-white
          "
        >
          <Settings size={19} strokeWidth={1.9} />
        </button>
      </div>
    </aside>
  );
}
