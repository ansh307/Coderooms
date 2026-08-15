"use client";

import { ChevronDown, Hash } from "lucide-react";
import { useState } from "react";

interface Room {
  _id: string;
  name: string;
  language: string;
  description: string;
  owner: string;
  type: "private" | "public";
  isArchived: boolean;
  maxUsers: number;
  activeUsers: number;
  lastActivityAt: string;
  createdAt: string;
  updatedAt: string;
}

interface SidebarRoomsProps {
  publicRooms: Room[];
  myRooms: Room[];
  joinedRooms: Room[];
  activeRoom: Room | null;
  loading: boolean;
  error: string | null;
  onSetActiveRoom: (room: Room) => void;
}

interface RoomSectionProps {
  title: string;
  rooms: Room[];
  activeRoom: Room | null;
  open: boolean;
  onToggle: () => void;
  onSetActiveRoom: (room: Room) => void;
}

function RoomSection({
  title,
  rooms,
  activeRoom,
  open,
  onToggle,
  onSetActiveRoom,
}: RoomSectionProps) {
  return (
    <section className="mb-5">
      {/* Section Header */}
      <button
        type="button"
        onClick={onToggle}
        className="
          group
          flex
          w-full
          items-center
          justify-between
          px-2
          py-1.5
          text-left
          border-b  
          border-surface-muted
          rounded-lg
        "
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-semibold uppercase tracking-[0.08em] text-[#777f8e]`}
          >
            {title}
          </span>

          <span className="text-[10px] text-[#555d6c]">{rooms.length}</span>
        </div>

        <ChevronDown
          size={15}
          className={[
            "text-[#666e7d] transition-transform duration-200",
            open ? "rotate-0" : "-rotate-90",
          ].join(" ")}
        />
      </button>

      {/* Rooms */}
      <div
        className={[
          "grid transition-all duration-200",
          open
            ? "mt-2 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
      >
        <div className="min-h-0 overflow-hidden">
          {rooms.length === 0 ? (
            <div className="px-2 py-3 text-xs text-[#606878]">No rooms</div>
          ) : (
            <div className="space-y-1">
              {rooms.map((room) => {
                const selected = activeRoom?._id === room._id;

                return (
                  <button
                    key={room._id}
                    type="button"
                    onClick={() => onSetActiveRoom(room)}
                    className={[
                      "group flex min-h-[52px] w-full items-center rounded-[10px]",
                      "border px-3 text-left transition-all duration-200",
                      selected
                        ? "border-green-accent-muted bg-surface-muted"
                        : "border-transparent bg-transparent hover:border-border-color hover:bg-surface-muted",
                    ].join(" ")}
                  >
                    {/* Icon */}
                    <div
                      className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px]",
                        "transition-colors duration-200",
                        selected
                          ? "bg-surface text-green-accent"
                          : "bg-surface-muted text-[#aeb4c0] group-hover:text-[#d2d6df]",
                      ].join(" ")}
                    >
                      <Hash size={17} strokeWidth={2} />
                    </div>

                    {/* Content */}
                    <div className="ml-3 min-w-0 flex-1">
                      <p
                        className={[
                          "truncate text-[14px] font-medium",
                          selected ? "text-[#e8ebf0]" : "text-[#d4d8e1]",
                        ].join(" ")}
                      >
                        {room.name}
                      </p>

                      {room.language && (
                        <p className="mt-0.5 truncate text-[11px] capitalize text-[#6f7787]">
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
      </div>
    </section>
  );
}

export default function SidebarRooms({
  publicRooms,
  myRooms,
  joinedRooms,
  activeRoom,
  loading,
  error,
  onSetActiveRoom,
}: SidebarRoomsProps) {
  const [publicOpen, setPublicOpen] = useState(false);
  const [myRoomsOpen, setMyRoomsOpen] = useState(false);
  const [joinedOpen, setJoinedOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {/* Loading */}
      {loading && (
        <div className="space-y-5">
          {[1, 2, 3].map((item) => (
            <div key={item}>
              <div className="mb-3 h-3 w-24 animate-pulse rounded bg-surface-muted" />

              <div className="space-y-2">
                <div className="h-[52px] w-full animate-pulse rounded-[10px] bg-surface-muted" />
                <div className="h-[52px] w-full animate-pulse rounded-[10px] bg-surface-muted" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-[12px] border border-border-color bg-surface-muted p-4 text-sm text-[#aeb4c0]">
          {error}
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <div>
          <RoomSection
            title="Public Rooms"
            rooms={publicRooms}
            activeRoom={activeRoom}
            open={publicOpen}
            onToggle={() => setPublicOpen((prev) => !prev)}
            onSetActiveRoom={onSetActiveRoom}
          />

          <RoomSection
            title="My Rooms"
            rooms={myRooms}
            activeRoom={activeRoom}
            open={myRoomsOpen}
            onToggle={() => setMyRoomsOpen((prev) => !prev)}
            onSetActiveRoom={onSetActiveRoom}
          />

          <RoomSection
            title="Joined Rooms"
            rooms={joinedRooms}
            activeRoom={activeRoom}
            open={joinedOpen}
            onToggle={() => setJoinedOpen((prev) => !prev)}
            onSetActiveRoom={onSetActiveRoom}
          />

          {/* Completely empty state */}
          {publicRooms.length === 0 &&
            myRooms.length === 0 &&
            joinedRooms.length === 0 && (
              <div className="px-3 py-8 text-center">
                <Hash size={24} className="mx-auto mb-3 text-[#606878]" />

                <p className="text-sm font-medium text-[#d8dce5]">
                  No CodeRooms
                </p>

                <p className="mt-1 text-xs leading-5 text-[#858c9b]">
                  Create a CodeRoom to start collaborating.
                </p>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
