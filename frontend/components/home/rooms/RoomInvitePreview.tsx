"use client";

import { InviteMembership, InviteRoom } from "@/types/rooms";
import { Hash, Lock, Users } from "lucide-react";

interface RoomInvitePreviewProps {
  room: InviteRoom;
  membership: InviteMembership | null;
  status: string | null;
  joining: boolean;
  onJoin: () => void;
}

export default function RoomInvitePreview({
  room,
  membership,
  status,
  joining,
  onJoin,
}: RoomInvitePreviewProps) {
  const isPending = membership?.status === "pending";

  const isActive = membership?.status === "active";

  const isBanned = membership?.status === "banned";

  const isOwner = membership?.role === "owner";

  return (
    <div
      className="
        w-full
        max-w-[460px]
        overflow-hidden
        rounded-[16px]
        border
        border-border-color
        bg-surface
        shadow-2xl
      "
    >
      {/* Header */}

      <div className="border-b border-border-color px-6 py-5">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-[9px]
              bg-surface-muted
              text-green-accent
            "
          >
            <Hash size={20} />
          </div>

          <div className="min-w-0">
            <p className="text-[12px] text-gray-muted">
              You've been invited to
            </p>

            <h1 className="truncate text-[17px] font-semibold text-primary-heading">
              {room.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}

      <div className="p-6">
        {/* Description */}

        {room.description && (
          <p className="text-[13px] leading-5 text-gray-muted">
            {room.description}
          </p>
        )}

        {/* Room information */}

        <div className="mt-5 grid grid-cols-2 gap-3">
          {/* Language */}

          <div
            className="
              rounded-[10px]
              border
              border-border-color
              bg-surface-muted
              p-3
            "
          >
            <div className="flex items-center gap-2">
              <Hash size={15} className="text-gray-muted" />

              <span className="text-[11px] text-gray-muted">Language</span>
            </div>

            <p className="mt-1 text-[13px] font-medium capitalize text-primary-heading">
              {room.language}
            </p>
          </div>

          {/* Members */}

          <div
            className="
              rounded-[10px]
              border
              border-border-color
              bg-surface-muted
              p-3
            "
          >
            <div className="flex items-center gap-2">
              <Users size={15} className="text-gray-muted" />

              <span className="text-[11px] text-gray-muted">Members</span>
            </div>

            <p className="mt-1 text-[13px] font-medium text-primary-heading">
              {room.activeUsers}/{room.maxUsers}
            </p>
          </div>
        </div>

        {/* Private room information */}

        {room.type === "private" && (
          <div
            className="
              mt-5
              rounded-[10px]
              border
              border-border-color
              bg-surface-muted
              p-3
            "
          >
            <div className="flex items-start gap-2">
              <Lock size={14} className="mt-0.5 shrink-0 text-gray-muted" />

              <p className="text-[12px] leading-5 text-gray-muted">
                This is a private CodeRoom. Your request will need to be
                approved by the room owner before you can access it.
              </p>
            </div>
          </div>
        )}

        {/* Join button */}

        <button
          type="button"
          onClick={onJoin}
          disabled={joining || isPending || isActive || isBanned || isOwner}
          className="
            mt-5
            h-11
            w-full
            rounded-[9px]
            bg-green-accent
            text-[14px]
            font-medium
            text-white
            transition-opacity
            hover:opacity-90
            disabled:pointer-events-none
            disabled:opacity-50
          "
        >
          {joining
            ? "Joining..."
            : isOwner
              ? "You're the Owner"
              : isPending
                ? "Already Requested"
                : isActive
                  ? "Already a Member"
                  : isBanned
                    ? "Banned from Room"
                    : room.type === "public"
                      ? "Join Room"
                      : "Request to Join"}
        </button>
      </div>
    </div>
  );
}
