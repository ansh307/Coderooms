"use client";

import { Hash } from "lucide-react";

interface SidebarRoomsProps {
  rooms: any[];
  activeRoom: any;
  loading: boolean;
  error: string | null;
  onSetActiveRoom: (room: any) => void;
}

export default function SidebarRooms({
  rooms,
  activeRoom,
  loading,
  error,
  onSetActiveRoom,
}: SidebarRoomsProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {/* Loading */}
      {loading && (
        <div className="space-y-[14px]">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                h-[65px]
                w-full
                animate-pulse
                rounded-[12px]
                border
                border-border-color
                bg-surface-muted
              "
            />
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-[12px] border border-border-color bg-surface-muted p-4 text-sm text-[#aeb4c0]">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && rooms.length === 0 && (
        <div className="px-3 py-8 text-center">
          <Hash size={24} className="mx-auto mb-3 text-[#606878]" />

          <p className="text-sm font-medium text-[#d8dce5]">No CodeRooms</p>

          <p className="mt-1 text-xs leading-5 text-[#858c9b]">
            Create a CodeRoom to start collaborating.
          </p>
        </div>
      )}

      {/* Rooms */}
      {!loading && !error && rooms.length > 0 && (
        <div className="space-y-[14px]">
          {rooms.map((room) => {
            const selected = activeRoom?._id === room._id;

            return (
              <button
                key={room._id}
                onClick={() => onSetActiveRoom(room)}
                className={[
                  "group flex h-[65px] w-full items-center rounded-[12px]",
                  "border px-4 text-left transition-all duration-200",
                  selected
                    ? "border-green-accent-muted bg-surface shadow-[0_0_20px_rgba(91,75,211,0.08)]"
                    : "border-border-color bg-surface hover:border-[#353c49]",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px]",
                    "transition-colors",
                    selected
                      ? "bg-surface-muted text-green-accent"
                      : "bg-surface-muted text-[#d2d6df]",
                  ].join(" ")}
                >
                  <Hash size={18} strokeWidth={2} />
                </div>

                <div className="ml-3 min-w-0 flex-1">
                  <p className="truncate text-[16px] font-medium text-[#e4e6ec]">
                    {room.name}
                  </p>

                  {room.language && (
                    <p className="mt-0.5 text-xs capitalize text-[#777f8e]">
                      {room.language}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
