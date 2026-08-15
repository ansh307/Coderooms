"use client";

import {
  UserPlus,
  UsersRound,
  MessageCircle,
  PanelRightOpen,
  PanelRightClose,
} from "lucide-react";

import { useEffect, useState, useRef } from "react";
import { api } from "@/api";

import { getSocket } from "@/socket/socket";
import useAuthStore from "@/store/auth.store";
import { useRoomStore } from "@/store/room.store";
import { toast } from "sonner";

interface MembersPanelProps {
  open: boolean;
  onToggle: () => void;
}

interface RoomMember {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  role: "owner" | "admin" | "member";
  status: "active" | "left" | "banned";
  joinedAt: string;
}

interface ChatMessage {
  _id: string;
  room: string;
  content: string;
  sender: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

export default function MembersPanel({ open, onToggle }: MembersPanelProps) {
  const [activeTab, setActiveTab] = useState<"members" | "chats">("members");

  const activeRoom = useRoomStore((state) => state.activeRoom);
  const joinedRooms = useRoomStore((state) => state.joinedRooms);
  const membershipLoading = useRoomStore((state) => state.membershipLoading);
  const setMembership = useRoomStore((state) => state.setMembership);
  const setMembershipLoading = useRoomStore(
    (state) => state.setMembershipLoading,
  );

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [members, setMembers] = useState<RoomMember[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [membersError, setMembersError] = useState<string | null>(null);

  const roomMembership = activeRoom ? joinedRooms[activeRoom._id] : undefined;

  const isMember = roomMembership === true;

  const isCheckingMembership =
    activeRoom &&
    (roomMembership === undefined ||
      membershipLoading[activeRoom._id] === true);

  // Get membership
  useEffect(() => {
    if (!activeRoom) return;

    const roomId = activeRoom._id;

    const checkMembership = async () => {
      try {
        setMembershipLoading(roomId, true);

        const response = await api.get(
          `/roomMember/rooms/${roomId}/membership`,
        );

        const isMember = response.data?.data?.isMember === true;

        setMembership(roomId, isMember);
      } catch (error) {
        console.error("Failed to check room membership:", error);

        setMembership(roomId, false);
      } finally {
        setMembershipLoading(roomId, false);
      }
    };

    checkMembership();
  }, [activeRoom, setMembership, setMembershipLoading]);

  /*
   * Fetch members And Fetch Messages
   */

  useEffect(() => {
    if (!activeRoom) {
      setMembers([]);
      setMessages([]);
      return;
    }

    const roomId = activeRoom._id;

    if (isCheckingMembership) {
      return;
    }

    if (!isMember) {
      setMembersError("You are not a member of this room.");
      setMessagesError("You are not a member of this room.");
      return;
    }

    const fetchMembers = async () => {
      try {
        setMembersLoading(true);
        setMembersError(null);

        const response = await api.get(
          `/roomMember/rooms/${activeRoom._id}/members`,
        );

        setMembers(response.data.data ?? response.data ?? []);
      } catch (error: any) {
        // console.error("Failed to fetch room members:", error);

        toast.error(
          error?.response?.data?.message || "Failed to load messages",
        );

        setMembersError(
          error?.response?.data?.message || "Failed to load members.",
        );

        setMembers([]);
      } finally {
        setMembersLoading(false);
      }
    };

    const fetchMessages = async () => {
      try {
        setMessagesLoading(true);
        setMessagesError(null);

        const response = await api.get(`/rooms/${activeRoom._id}/messages`);

        setMessages(response.data.data ?? response.data ?? []);
      } catch (error: any) {
        // console.error("Failed to load messages:", error);

        toast.error(
          error?.response?.data?.message || "Failed to load messages",
        );

        setMessagesError(
          error?.response?.data?.message || "Failed to load messages.",
        );

        setMessages([]);
      } finally {
        setMessagesLoading(false);
      }
    };

    fetchMessages();
    fetchMembers();
  }, [activeRoom, isMember, isCheckingMembership]);

  /*
   * ReceiveMessage and
   */

  useEffect(() => {
    if (!activeRoom) return;

    const token = useAuthStore.getState().accessToken;

    if (!token) return;

    const socket = getSocket(token);

    const handleReceiveMessage = (message: ChatMessage) => {
      if (message.room !== activeRoom._id) {
        return;
      }

      setMessages((prev) => {
        // Prevent duplicate messages
        if (prev.some((item) => item._id === message._id)) {
          return prev;
        }

        return [...prev, message];
      });
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [activeRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  /*
   * handleSendMessage
   */

  const handleSendMessage = () => {
    const content = messageInput.trim();

    if (!content || !activeRoom) {
      return;
    }

    const token = useAuthStore.getState().accessToken;

    if (!token) {
      toast.error("Authentication required");
      return;
    }

    const socket = getSocket(token);

    if (!socket.connected) {
      toast.error("Not connected to room");
      return;
    }

    socket.emit("send-message", {
      roomId: activeRoom._id,
      content,
    });

    setMessageInput("");
  };

  /*
   * support Enter
   */
  const handleMessageKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  /*
   * COLLAPSED
   */
  if (!open) {
    return (
      <aside className="flex h-full min-h-0 min-w-[60px] flex-col items-center overflow-hidden rounded-[16px] border border-border-color bg-surface py-4">
        {/* Open Panel */}
        <button
          onClick={onToggle}
          className="
            group relative
            flex h-10 w-10
            items-center justify-center
            rounded-[9px]
            text-[#aeb4c0]
            transition-all duration-200
            hover:bg-surface-muted
            hover:text-white
          "
          aria-label="Open members panel"
          title="Open members panel"
        >
          {/* Members icon */}
          <UsersRound
            size={21}
            strokeWidth={1.9}
            className="
              transition-all duration-200
              group-hover:scale-0
              group-hover:opacity-0
            "
          />

          {/* Open icon */}
          <PanelRightOpen
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

        {/* Divider */}
        <div className="my-5 h-px w-6 bg-[#252b36]" />

        {/* Members */}
        <button
          onClick={() => {
            setActiveTab("members");
            onToggle();
          }}
          title="Members"
          className={[
            "flex h-10 w-10 items-center justify-center rounded-[9px]",
            "transition-all duration-200",
            activeTab === "members"
              ? "bg-green-accent-muted text-white shadow-[0_0_18px_rgba(91,75,211,0.12)]"
              : "bg-surface-muted text-[#aeb4c0]  hover:text-white",
          ].join(" ")}
        >
          <UsersRound size={19} strokeWidth={1.9} />
        </button>

        {/* Chats */}
        <button
          onClick={() => {
            setActiveTab("chats");
            onToggle();
          }}
          title="Chats"
          className={[
            "mt-3 flex h-10 w-10 items-center justify-center rounded-[9px]",
            "transition-all duration-200",
            activeTab === "chats"
              ? "bg-green-accent-muted text-white shadow-[0_0_18px_rgba(91,75,211,0.12)]"
              : "bg-surface-muted text-[#aeb4c0]  hover:text-white",
          ].join(" ")}
        >
          <MessageCircle size={19} strokeWidth={1.9} />
        </button>
      </aside>
    );
  }

  /*
   * EXPANDED
   */
  return (
    <aside className="flex h-full min-w-0 flex-col overflow-hidden rounded-[16px] border border-border-color bg-surface">
      {/* Tabs */}
      <div className="flex h-[74px] shrink-0 border-b border-border-color">
        {/* Members */}
        <button
          onClick={() => setActiveTab("members")}
          className={[
            "relative flex flex-1 items-center justify-center",
            "text-[19px] font-medium transition-colors",
            activeTab === "members"
              ? "text-green-accent"
              : "text-green-accent hover:text-green-accent-muted",
          ].join(" ")}
        >
          Members
          {activeTab === "members" && (
            <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-green-accent" />
          )}
        </button>

        {/* Chats */}
        <button
          onClick={() => setActiveTab("chats")}
          className={[
            "relative flex flex-1 items-center justify-center",
            "text-[19px] font-medium transition-colors",
            activeTab === "chats"
              ? "text-green-accent"
              : "text-green-accent hover:text-green-accent-muted",
          ].join(" ")}
        >
          Chats
          {activeTab === "chats" && (
            <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-green-accent" />
          )}
        </button>

        {/* Collapse */}
        <button
          onClick={onToggle}
          className="
            mr-3
            flex h-9 w-9
            items-center justify-center
            self-center
            rounded-[8px]
            text-[#858c9b]
            transition-all duration-200
            hover:bg-surface-muted
            hover:text-[#e5e7eb]
          "
          aria-label="Collapse members panel"
          title="Collapse members panel"
        >
          <PanelRightClose size={20} strokeWidth={1.9} />
        </button>
      </div>

      {/* Content */}
      <div className="flex min-h-0 flex-1">
        {activeTab === "members" ? (
          <div className="flex min-h-0 flex-1 w-full flex-col">
            {/* Members header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border-color px-5 py-4">
              <div>
                <h2 className="text-[15px] font-medium text-[#e4e6ec]">
                  Room Members
                </h2>

                <p className="mt-1 text-[12px] text-[#777f8e]">
                  {members.length} member{members.length !== 1 ? "s" : ""}
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
                  <p className="text-[13px] text-[#858c9b]">
                    Loading members...
                  </p>
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
        ) : (
          <div className="flex min-h-0 flex-1 w-full flex-col">
            {/* Chat header */}
            <div className="shrink-0 border-b border-border-color px-5 py-4">
              <h2 className="text-[15px] font-medium text-[#e4e6ec]">
                Room Chat
              </h2>

              <p className="mt-1 text-[12px] text-[#777f8e]">
                Chat with your room members
              </p>
            </div>

            {/* Messages */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              {messagesLoading ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-[13px] text-[#858c9b]">
                    Loading messages...
                  </p>
                </div>
              ) : messagesError ? (
                <div className="flex h-full items-center justify-center px-5 text-center">
                  <p className="text-[13px] text-red-400">{membersError}</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <MessageCircle
                    size={38}
                    strokeWidth={1.6}
                    className="text-[#505866]"
                  />

                  <p className="mt-4 text-[14px] font-medium text-[#dce0e8]">
                    No messages yet
                  </p>

                  <p className="mt-1 max-w-[220px] text-[12px] leading-5 text-[#777f8e]">
                    Start a conversation with your room members.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message._id} className="flex gap-3">
                      {/* Avatar */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-accent-muted">
                        <span className="text-[12px] font-medium text-white">
                          {message.sender.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      {/* Message */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="truncate text-[13px] font-medium text-[#dfe2e8]">
                            {message.sender.name}
                          </span>

                          <span className="shrink-0 text-[10px] text-[#626a78]">
                            {new Date(message.createdAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </span>
                        </div>

                        <p className="mt-1 break-words text-[13px] leading-5 text-[#aeb4c0]">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Message input */}
            <div className="shrink-0 border-t border-border-color p-3">
              <div className="flex items-center gap-2 rounded-[10px] border border-border-color bg-surface-muted px-3">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(event) => setMessageInput(event.target.value)}
                  onKeyDown={handleMessageKeyDown}
                  placeholder="Message room..."
                  className="
                    min-w-0 flex-1
                    bg-transparent
                    py-3
                    text-[13px]
                    text-[#e4e6ec]
                    outline-none
                    placeholder:text-[#626a78]
                  "
                />

                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-[7px]
                    bg-green-accent
                    text-white
                    transition-opacity
                    hover:opacity-90
                    disabled:pointer-events-none
                    disabled:opacity-30
                  "
                  aria-label="Send message"
                >
                  <MessageCircle size={16} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
