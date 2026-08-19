"use client";

import { useState } from "react";

import MembersPanelCollapsed from "./MembersPanelCollapsed";
import MembersPanelHeader from "./MembersPanelHeader";
import MembersTab from "./MembersTab";
import ChatTab from "./ChatTab";

import type { MembersPanelProps } from "./types";

import { useRoomMembership } from "@/hooks/room/useRoomMembership";
import { useRoomMembers } from "@/hooks/room/useRoomMembers";
import { useRoomChat } from "@/hooks/room/useRoomChat";
import { useRoomStore } from "@/store/room.store";
import { UsersRound } from "lucide-react";

export default function MembersPanel({ open, onToggle }: MembersPanelProps) {
  const [activeTab, setActiveTab] = useState<"members" | "chats">("members");

  const activeRoom = useRoomStore((state) => state.activeRoom);

  /*
   * Membership
   */

  const { isMember, isCheckingMembership } = useRoomMembership();

  /*
   * Members
   */

  const {
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
  } = useRoomMembers({
    isMember,
    isCheckingMembership,
  });

  /*
   * Chat
   */

  const {
    messages,
    messageInput,
    setMessageInput,
    messagesLoading,
    messagesError,
    messagesEndRef,
    handleSendMessage,
    handleMessageKeyDown,
  } = useRoomChat({
    isMember,
    isCheckingMembership,
  });

  /*
   * COLLAPSED
   */

  if (!open) {
    return (
      <MembersPanelCollapsed
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onToggle={onToggle}
      />
    );
  }

  if (!activeRoom) {
    return (
      <aside className="flex h-full min-w-0 flex-col overflow-hidden rounded-[16px] border border-border-color bg-surface">
        <MembersPanelHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onToggle={onToggle}
        />

        <div className="flex min-h-0 flex-1 items-center justify-center px-6">
          <div className="text-center">
            <UsersRound
              size={38}
              strokeWidth={1.5}
              className="mx-auto text-[#505866]"
            />

            <p className="mt-4 text-[14px] font-medium text-[#858c9b]">
              No room selected
            </p>

            <p className="mt-1 text-[12px] leading-5 text-[#606775]">
              Select a room to view members and chat.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  /*
   * EXPANDED
   */

  return (
    <aside className="flex h-full min-w-0 flex-col overflow-hidden rounded-[16px] border border-border-color bg-surface">
      {/* Tabs */}
      <MembersPanelHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onToggle={onToggle}
      />

      {/* Content */}
      <div className="flex min-h-0 flex-1">
        {activeTab === "members" ? (
          <MembersTab
            members={members}
            membersLoading={membersLoading}
            membersError={membersError}
            joinRequests={joinRequests}
            joinRequestsLoading={joinRequestsLoading}
            joinRequestsError={joinRequestsError}
            processingRequest={processingRequest}
            isOwner={isOwner}
            isPrivate={isPrivate}
            approveJoinRequest={approveJoinRequest}
            rejectJoinRequest={rejectJoinRequest}
          />
        ) : (
          <ChatTab
            messages={messages}
            messagesLoading={messagesLoading}
            messagesError={messagesError}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            handleMessageKeyDown={handleMessageKeyDown}
            handleSendMessage={handleSendMessage}
            messagesEndRef={messagesEndRef}
            membersError={membersError}
          />
        )}
      </div>
    </aside>
  );
}
