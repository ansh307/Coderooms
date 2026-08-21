"use client";

import { Settings, UsersRound } from "lucide-react";

interface SidebarBottomNavigationProps {
  onCreateRoom: () => void;
  onJoinRoom: () => void;
}

export default function SidebarBottomNavigation({
  onCreateRoom,
  onJoinRoom,
}: SidebarBottomNavigationProps) {
  return (
    <div className="shrink-0 space-y-3 border-t border-border-color p-4">
      <div className="flex gap-3">
        <button
          onClick={onCreateRoom}
          className="
          flex  h-[65px] w-full
          items-center rounded-[12px]
          border border-border-color
          bg-surface
          px-5
          hover:bg-surface-muted
        "
        >
          <span
            className="
            flex h-7 w-7
            items-center justify-center
            rounded-[7px]
            bg-surface-muted
            text-[18px]
            text-gray-muted
          "
          >
            +
          </span>
          <span className="ml-4 text-[16px] font-medium text-primary-heading">
            Create
          </span>
        </button>

        <button
          onClick={onJoinRoom}
          className="
          flex h-[65px] w-full
          items-center rounded-[12px]
          border border-border-color
          bg-surface
          px-5
          hover:bg-surface-muted
        "
        >
          <UsersRound size={18} className="text-primary-heading" />

          <span className="ml-4 text-[16px] font-medium text-primary-heading">
            Join Room
          </span>
        </button>
      </div>
      <button
        className="
          flex h-[65px] w-full
          items-center rounded-[12px]
          border border-border-color
          bg-surface
          px-5
          hover:bg-surface-muted
        "
      >
        <Settings size={18} className="text-primary-heading" />

        <span className="ml-4 text-[16px] font-medium text-primary-heading">
          Settings
        </span>
      </button>
    </div>
  );
}
