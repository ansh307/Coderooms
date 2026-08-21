"use client";

import { Code2, PanelLeftClose } from "lucide-react";

interface SidebarHeaderProps {
  onToggle: () => void;
}

export default function SidebarHeader({ onToggle }: SidebarHeaderProps) {
  return (
    <div className="flex h-[94px] shrink-0 items-center border-b border-border-color px-6">
      <div className="flex items-center gap-3">
        <div
          className="
            flex h-11 w-11
            items-center justify-center
            rounded-[9px]
            text-green-accent
          "
        >
          <Code2 size={25} strokeWidth={2.4} />
        </div>

        <h1 className="text-primary-heading text-[19px] font-semibold tracking-[-0.02em]">
          Coderooms
        </h1>
      </div>

      {/* Collapse */}
      <button
        onClick={onToggle}
        className="
          ml-auto
          flex h-9 w-9
          items-center justify-center
          rounded-[8px]
          text-gray-muted
          hover:bg-surface-muted
          hover:text-primary-heading
        "
        aria-label="Collapse sidebar"
        title="Collapse sidebar"
      >
        <PanelLeftClose size={20} strokeWidth={1.9} />
      </button>
    </div>
  );
}
