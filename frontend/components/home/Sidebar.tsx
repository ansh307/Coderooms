"use client";

import {
  Code2,
  Hash,
  Settings,
  UsersRound,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRoomStore } from "@/store/room.store";
import CreateRoomModal from "@/components/home/rooms/CreateRoomModal";

import { api } from "@/api";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
  // const [rooms, setRooms] = useState<Room[]>([]);
  // const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  const [createRoomOpen, setCreateRoomOpen] = useState(false);

  const {
    rooms,
    activeRoom,
    setRooms,
    setActiveRoom,
    loading,
    setLoading,
    error,
    setError,
  } = useRoomStore();

  /*
   * FETCH ROOMS
   */
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/room/get-all-rooms");

        const fetchedRooms = response.data.data ?? response.data;

        setRooms(fetchedRooms);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        setError("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [setRooms, setLoading, setError]);

  // const activeRoom = rooms.find((room) => room.id === selectedRoom) ?? rooms[0];

  /*
   * COLLAPSED SIDEBAR
   */
  if (!open) {
    return (
      <>
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
            onClick={() => setActiveRoom(activeRoom)}
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
              onClick={() => setCreateRoomOpen(true)}
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
        <CreateRoomModal
          open={createRoomOpen}
          onClose={() => setCreateRoomOpen(false)}
        />
      </>
    );
  }

  /*
   * EXPANDED SIDEBAR
   */
  return (
    <>
      <aside className="flex h-full min-h-0 flex-col overflow-hidden rounded-[16px] border border-border-color bg-surface">
        {/* Header */}
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
            hover:bg-surface-muted
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
                    onClick={() => setActiveRoom(room)}
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

        {/* Bottom Navigation */}
        <div className="shrink-0 space-y-3 border-t border-border-color p-4">
          <button
            onClick={() => setCreateRoomOpen(true)}
            className="
            flex h-[65px] w-full
            items-center rounded-[12px]
            border border-border-color
            bg-surface
            px-5
            transition-colors
            hover:bg-surface-muted
          "
          >
            <UsersRound size={18} className="text-[#e0e3eb]" />

            <span className="ml-4 text-[16px] font-medium text-[#e1e4eb]">
              Create CodeRoom
            </span>

            <span
              className="
              ml-auto
              flex h-7 w-7
              items-center justify-center
              rounded-[7px]
              bg-surface-muted
              text-[18px]
              text-[#d9dde6]
            "
            >
              +
            </span>
          </button>

          <button
            className="
            flex h-[65px] w-full
            items-center rounded-[12px]
            border border-border-color
            bg-surface
            px-5
            transition-colors
            hover:bg-surface-muted
          "
          >
            <Settings size={18} className="text-[#d9dde6]" />

            <span className="ml-4 text-[16px] font-medium text-[#e1e4eb]">
              Settings
            </span>
          </button>
        </div>
      </aside>
      <CreateRoomModal
        open={createRoomOpen}
        onClose={() => setCreateRoomOpen(false)}
      />
    </>
  );
}
