"use client";

import { Check, UserPlus, Users, UsersRound, X } from "lucide-react";

import type { JoinRequest, RoomMember } from "./types";
import { useState } from "react";
import { useRoomStore } from "@/store/room.store";

interface MembersTabProps {
  members: RoomMember[];
  membersLoading: boolean;
  membersError: string | null;

  joinRequests: JoinRequest[];
  joinRequestsLoading: boolean;
  joinRequestsError: string | null;

  processingRequest: string | null;

  isOwner: boolean;
  isPrivate: boolean;

  approveJoinRequest: (userId: string) => Promise<void>;

  rejectJoinRequest: (userId: string) => Promise<void>;
}

export default function MembersTab({
  members,
  membersLoading,
  membersError,

  joinRequests,
  joinRequestsLoading,
  joinRequestsError,

  processingRequest,

  isOwner,
  isPrivate,

  approveJoinRequest,
  rejectJoinRequest,
}: MembersTabProps) {
  const [showJoinRequests, setShowJoinRequests] = useState(false);
  const { activeRoom, setInviteRoom } = useRoomStore();
  return (
    <div className="flex min-h-0 flex-1 w-full flex-col">
      {/* Members header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border-color px-5 py-4">
        <div>
          <h2 className="text-[15px] font-medium text-[#e4e6ec]">
            Room Members
          </h2>

          <p className="mt-1 text-[12px] text-[#777f8e]">
            {members.length} member
            {members.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Join requests - OWNER ONLY */}
          {isOwner && !!isPrivate && (
            <button
              type="button"
              onClick={() => setShowJoinRequests(true)}
              className="
          relative
          flex h-9
          items-center gap-2
          rounded-[8px]
          border border-border-color
          bg-surface-muted
          px-3
          text-[12px]
          font-medium
          text-[#858c9b]
          transition-colors
          hover:text-white
        "
              title="Join requests"
            >
              <Users size={15} />

              <span>Requests</span>

              {joinRequests.length > 0 && (
                <span
                  className="
              flex h-5 min-w-5
              items-center justify-center
              rounded-full
              bg-green-accent
              px-1.5
              text-[10px]
              font-semibold
              text-white
            "
                >
                  {joinRequests.length}
                </span>
              )}
            </button>
          )}

          {/* Invite */}
          <button
            onClick={() => setInviteRoom(activeRoom)}
            type="button"
            className="
        flex h-9 w-9
        items-center justify-center
        rounded-[8px]
        text-[#858c9b]
        transition-colors
        hover:bg-surface-muted
        hover:text-white
      "
            title="Invite members"
          >
            <UserPlus size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>
      {/* Members list */}
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {membersLoading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-[13px] text-[#858c9b]">Loading members...</p>
          </div>
        ) : membersError ? (
          <div className="flex h-full items-center justify-center px-5 text-center">
            <p className="text-[13px] text-red-400">{membersError}</p>
          </div>
        ) : members.length === 0 ? (
          <div className="flex h-full items-center justify-center px-5 text-center">
            <div>
              <UsersRound
                size={36}
                strokeWidth={1.6}
                className="mx-auto text-[#505866]"
              />

              <p className="mt-4 text-[14px] text-[#858c9b]">
                No members found.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {members.map((member) => (
              <div
                key={member._id}
                className="
                  flex items-center gap-3
                  rounded-[10px]
                  px-3 py-3
                  transition-colors
                  hover:bg-surface-muted
                "
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-accent-muted">
                  <span className="text-[13px] font-medium text-white">
                    {member?.user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* User info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium text-[#dfe2e8]">
                    {member?.user?.name}
                  </p>

                  <p className="mt-0.5 text-[11px] capitalize text-[#777f8e]">
                    {member?.role}
                  </p>
                </div>

                {/* Online indicator */}
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#65c97b]" />
              </div>
            ))}
          </div>
        )}
      </div>
      {showJoinRequests && isOwner && (
        <div
          className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/50
      px-4
    "
          onMouseDown={() => setShowJoinRequests(false)}
        >
          <div
            className="
        w-full max-w-[440px]
        overflow-hidden
        rounded-[14px]
        border border-border-color
        bg-surface
        shadow-2xl
      "
            onMouseDown={(event) => event.stopPropagation()}
          >
            {/* Header */}

            <div
              className="
          flex items-center justify-between
          border-b border-border-color
          px-5 py-4
        "
            >
              <div>
                <h3 className="text-[15px] font-medium text-[#e4e6ec]">
                  Join Requests
                </h3>

                <p className="mt-1 text-[11px] text-[#777f8e]">
                  {joinRequests.length} pending request
                  {joinRequests.length !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowJoinRequests(false)}
                className="
            flex h-8 w-8
            items-center justify-center
            rounded-[8px]
            text-[#777f8e]
            hover:bg-surface-muted
            hover:text-white
          "
              >
                <X size={17} />
              </button>
            </div>

            {/* Requests */}

            <div className="max-h-[420px] overflow-y-auto p-3">
              {joinRequestsLoading ? (
                <div className="flex h-32 items-center justify-center">
                  <p className="text-[13px] text-[#858c9b]">
                    Loading requests...
                  </p>
                </div>
              ) : joinRequestsError ? (
                <div className="flex h-32 items-center justify-center px-5 text-center">
                  <p className="text-[13px] text-red-400">
                    {joinRequestsError}
                  </p>
                </div>
              ) : joinRequests.length === 0 ? (
                <div className="flex h-32 items-center justify-center px-5 text-center">
                  <div>
                    <UserPlus
                      size={30}
                      strokeWidth={1.5}
                      className="mx-auto text-[#505866]"
                    />

                    <p className="mt-3 text-[13px] text-[#858c9b]">
                      No pending requests.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  {joinRequests.map((request) => {
                    const userId = request.user._id;

                    const isProcessing = processingRequest === userId;

                    return (
                      <div
                        key={request._id}
                        className="
                    flex items-center gap-3
                    rounded-[10px]
                    px-3 py-3
                    hover:bg-surface-muted
                  "
                      >
                        {/* Avatar */}

                        <div
                          className="
                      flex h-9 w-9 shrink-0
                      items-center justify-center
                      rounded-full
                      bg-green-accent-muted
                    "
                        >
                          <span className="text-[13px] font-medium text-white">
                            {request.user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>

                        {/* User */}

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13px] font-medium text-[#dfe2e8]">
                            {request.user.name}
                          </p>

                          <p className="mt-0.5 truncate text-[11px] text-[#777f8e]">
                            {request.user.email}
                          </p>
                        </div>

                        {/* Actions */}

                        <div className="flex shrink-0 items-center gap-1">
                          {/* Reject */}

                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() => rejectJoinRequest(userId)}
                            className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-[7px]
                        text-[#858c9b]
                        hover:bg-red-500/10
                        hover:text-red-400
                        disabled:opacity-50
                      "
                            title="Reject request"
                          >
                            <X size={15} />
                          </button>

                          {/* Approve */}

                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() => approveJoinRequest(userId)}
                            className="
                        flex h-8 w-8
                        items-center justify-center
                        rounded-[7px]
                        bg-green-accent
                        text-white
                        hover:opacity-90
                        disabled:opacity-50
                      "
                            title="Approve request"
                          >
                            <Check size={15} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
