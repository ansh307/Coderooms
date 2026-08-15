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

export default function MembersPanel({ open, onToggle }: MembersPanelProps) {
  const [activeTab, setActiveTab] = useState<"members" | "chats">("members");

  /*
   * Membership
   */

  const { isMember, isCheckingMembership } = useRoomMembership();

  /*
   * Members
   */

  const { members, membersLoading, membersError } = useRoomMembers({
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
