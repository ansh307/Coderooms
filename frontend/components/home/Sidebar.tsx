"use client";

import {
  Code2,
  Hash,
  Settings,
  UsersRound,
  Circle,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useState } from "react";

const rooms = [
  {
    name: "React Ninjas",
    active: true,
  },
  {
    name: "Algo Avengers",
    active: false,
  },
  {
    name: "Dev Wizards",
    active: false,
  },
  {
    name: "Code Crafters",
    active: false,
  },
  {
    name: "Bug Busters",
    active: false,
  },
];

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
  const [selectedRoom, setSelectedRoom] = useState("React Ninjas");

  const activeRoom =
    rooms.find((room) => room.name === selectedRoom) ?? rooms[0];

  /*
   * COLLAPSED SIDEBAR
   */
  if (!open) {
    return (
      <aside className="flex h-full min-h-0 min-w-[60px] flex-col items-center overflow-hidden rounded-[16px] border border-[#262d3a] bg-surface py-4">
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
        <div className="my-5 h-px w-6 bg-[#252b36]" />

        {/* Active Room Only */}
        <button
          onClick={() => setSelectedRoom(activeRoom.name)}
          title={activeRoom.name}
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
            <UsersRound size={19} strokeWidth={1.9} />
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

  /*
   * EXPANDED SIDEBAR
   */
  return (
    <aside className="flex h-full min-h-0 flex-col overflow-hidden rounded-[16px] border border-[#262d3a] bg-surface">
      {/* Header */}
      <div className="flex h-[94px] shrink-0 items-center border-b border-[#252b36] px-6">
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

          <h1 className="text-[19px] font-semibold tracking-[-0.02em]">
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
            text-[#858c9b]
            transition-all duration-200
            hover:bg-[#191e29]
            hover:text-[#e5e7eb]
          "
          aria-label="Collapse sidebar"
          title="Collapse sidebar"
        >
          <PanelLeftClose size={20} strokeWidth={1.9} />
        </button>
      </div>

      {/* Rooms */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-[14px]">
          {rooms.map((room) => {
            const selected = selectedRoom === room.name;

            return (
              <button
                key={room.name}
                onClick={() => setSelectedRoom(room.name)}
                className={[
                  "group flex h-[65px] w-full items-center rounded-[12px]",
                  "border px-4 text-left transition-all duration-200",
                  selected
                    ? "border-green-accent-muted bg-surface shadow-[0_0_20px_rgba(91,75,211,0.08)]"
                    : "border-border-color bg-surface hover:border-[#353c49] ",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px]",
                    "text-[21px] font-medium transition-colors",
                    selected
                      ? "bg-surface-muted text-green-accent"
                      : "bg-surface-muted text-[#d2d6df]",
                  ].join(" ")}
                >
                  <Hash size={18} strokeWidth={2} />
                </div>

                <span className="ml-3 flex-1 text-[16px] font-medium text-[#e4e6ec]">
                  {room.name}
                </span>

                {/* <Circle
                  size={11}
                  fill={room.active ? "#65c97b" : "#606878"}
                  strokeWidth={0}
                /> */}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="shrink-0 space-y-3 border-t border-[#252b36] p-4">
        <button
          className="
            flex h-[65px] w-full
            items-center rounded-[12px]
            border border-[#292f3b]
            bg-surface
            px-5
            transition-colors
            hover:bg-[#202532]
          "
        >
          <UsersRound size={18} className="text-[#e0e3eb]" />

          <span className="ml-4 text-[16px] font-medium text-[#e1e4eb]">
            My CodeRoom
          </span>

          <Settings size={22} className="ml-auto text-[#d9dde6]" />
        </button>

        <button
          className="
            flex h-[65px] w-full
            items-center rounded-[12px]
            border border-[#292f3b]
            bg-surface
            px-5
            transition-colors
            hover:bg-[#202532]
          "
        >
          <Settings size={18} className="text-[#d9dde6]" />

          <span className="ml-4 text-[16px] font-medium text-[#e1e4eb]">
            Settings
          </span>
        </button>
      </div>
    </aside>
  );
}
