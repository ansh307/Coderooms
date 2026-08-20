"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Room } from "@/types/rooms";

import {
  ChevronDown,
  Hash,
  Trash2,
  MoreHorizontal,
  Pencil,
  Link2,
} from "lucide-react";
import { useEffect, useState } from "react";

interface SidebarRoomsProps {
  publicRooms: Room[];
  myRooms: Room[];
  joinedRooms: Room[];
  activeRoom: Room | null;
  loading: boolean;
  error: string | null;
  onSetActiveRoom: (room: Room) => void;
  onDeleteRoom: (room: Room) => void;
  onEditRoom: (room: Room) => void;
  onJoinRoom: (room: Room) => void;
  onInviteRoom: (room: Room) => void;
}

interface RoomSectionProps {
  title: string;
  rooms: Room[];
  activeRoom: Room | null;
  open: boolean;
  allowActions?: boolean;
  allowJoin?: boolean;
  onToggle: () => void;
  onSetActiveRoom: (room: Room) => void;
  onEditRoom?: (room: Room) => void;
  onDeleteRoom?: (room: Room) => void;
  onJoinRoom?: (room: Room) => void;
  onInviteRoom?: (room: Room) => void;
}

function RoomSection({
  title,
  rooms,
  activeRoom,
  open,
  allowActions = false,
  allowJoin = false,
  onToggle,
  onSetActiveRoom,
  onDeleteRoom,
  onEditRoom,
  onJoinRoom,
  onInviteRoom,
}: RoomSectionProps) {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = () => {
      setMenuOpen(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <section className="relative mb-2">
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
      rounded-md
      border-b
      border-border-color
      px-2
      py-1.5
      text-left
    "
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#777f8e]">
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
        <div
          className={[
            "min-h-0",
            open ? "overflow-visible" : "overflow-hidden ",
          ].join(" ")}
        >
          {rooms.length === 0 ? (
            <div className="px-2 py-3 text-xs text-[#606878]">No rooms</div>
          ) : (
            <div className="space-y-1">
              {rooms.map((room) => {
                const selected = activeRoom?._id === room._id;

                return (
                  <div
                    key={room._id}
                    className={[
                      "group relative z-0 flex min-h-[52px] items-center rounded-[10px]",
                      selected
                        ? "bg-surface-muted "
                        : "bg-transparent hover:bg-surface-muted ",
                      menuOpen === room._id ? "z-50" : "",
                    ].join(" ")}
                  >
                    {/* Room button */}
                    <button
                      type="button"
                      onClick={() => onSetActiveRoom(room)}
                      className={[
                        "flex min-h-[52px] min-w-0 flex-1 items-center rounded-[10px]",
                        "px-3 text-left transition-all duration-200",
                        allowActions ? "pr-10" : "",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px]",
                          selected ? "text-green-accent" : "text-[#aeb4c0]",
                          "bg-surface-muted",
                        ].join(" ")}
                      >
                        <Hash size={17} strokeWidth={2} />
                      </div>

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

                    {/* Actions */}
                    {allowActions && (
                      <div className="relative">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();

                            setMenuOpen((prev) =>
                              prev === room._id ? null : room._id,
                            );
                          }}
                          className={[
                            "flex h-7 w-7 items-center justify-center rounded-md",
                            "text-[#666e7d] transition-all duration-150",
                            "opacity-0 group-hover:opacity-100",
                            "hover:text-[#d8dce5]",
                            selected ? "opacity-50" : "",
                            menuOpen === room._id
                              ? "opacity-100 text-[#d8dce5]"
                              : "",
                          ].join(" ")}
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        {/* Action Menu */}
                        {menuOpen === room._id && (
                          <div
                            className="
                          absolute
                          right-0
                          top-full
                          z-[100]
                          mt-1
                          w-[150px]
                          overflow-hidden
                          rounded-[10px]
                          border
                          border-border-color
                          bg-surface
                          p-1
                          shadow-[0_12px_35px_rgba(0,0,0,0.45)]
                        "
                            onClick={(event) => event.stopPropagation()}
                          >
                            {room.type === "private" && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setMenuOpen(null);
                                    onInviteRoom?.(room);
                                  }}
                                  className="
                                      flex
                                      w-full
                                      items-center
                                      gap-2
                                      rounded-[7px]
                                      px-3
                                      py-2
                                      text-left
                                      text-sm
                                      text-[#d8dce5]
                                      transition-colors
                                      hover:bg-surface-muted
                                      hover:text-white
                                  "
                                >
                                  <Link2 size={14} strokeWidth={1.8} />
                                  <span>Invite Others</span>
                                </button>

                                <div className="my-1 h-px bg-border-color" />
                              </>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                setMenuOpen(null);
                                onEditRoom?.(room);
                              }}
                              className="
                            flex
                            w-full
                            items-center
                            gap-2
                            rounded-[7px]
                            px-3
                            py-2
                            text-left
                            text-sm
                            text-[#d8dce5]
                            transition-colors
                            hover:bg-surface-muted
                            hover:text-white
                          "
                            >
                              <Pencil size={14} strokeWidth={1.8} />
                              <span>Edit Room</span>
                            </button>

                            <div className="my-1 h-px bg-border-color" />

                            <button
                              type="button"
                              onClick={() => {
                                setMenuOpen(null);
                                onDeleteRoom?.(room);
                              }}
                              className="
                            flex
                            w-full
                            items-center
                            gap-2
                            rounded-[7px]
                            px-3
                            py-2
                            text-left
                            text-sm
                            text-red-400
                            transition-colors
                            hover:bg-red-500/10
                          "
                            >
                              <Trash2 size={14} strokeWidth={1.8} />
                              <span>Delete Room</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {allowJoin && (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onJoinRoom?.(room);
                        }}
                        className="
                            shrink-0
                            rounded-[7px]
                            border border-border-color
                            px-2.5
                            py-1.5
                            text-[11px]
                            font-medium
                            text-[#aeb4c0]
                            transition-colors
                            hover:border-green-accent-muted
                            hover:bg-surface
                            hover:text-green-accent
                          "
                      >
                        Join
                      </button>
                    )}
                  </div>
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
  onDeleteRoom,
  onEditRoom,
  onJoinRoom,
  onInviteRoom,
}: SidebarRoomsProps) {
  const [publicOpen, setPublicOpen] = useState(false);
  const [myRoomsOpen, setMyRoomsOpen] = useState(false);
  const [joinedOpen, setJoinedOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto py-4 px-2">
      {/* Loading */}
      {loading && (
        <div className="flex h-full items-center justify-center">
          <p className="text-[#858c9b] text-xs">Loading...</p>
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
            onJoinRoom={onJoinRoom}
            allowJoin={true}
          />

          <RoomSection
            title="My Rooms"
            rooms={myRooms}
            activeRoom={activeRoom}
            open={myRoomsOpen}
            onToggle={() => setMyRoomsOpen((prev) => !prev)}
            onSetActiveRoom={onSetActiveRoom}
            onDeleteRoom={onDeleteRoom}
            onEditRoom={onEditRoom}
            allowActions={true}
            onInviteRoom={onInviteRoom}
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
