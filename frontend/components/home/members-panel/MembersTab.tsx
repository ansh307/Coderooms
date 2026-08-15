"use client";

import { UserPlus, UsersRound } from "lucide-react";

import type { RoomMember } from "./types";

interface MembersTabProps {
  members: RoomMember[];
  membersLoading: boolean;
  membersError: string | null;
}

export default function MembersTab({
  members,
  membersLoading,
  membersError,
}: MembersTabProps) {
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

        <button
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
    </div>
  );
}
