"use client";

import { MessageCircle } from "lucide-react";

import type { ChatMessage } from "./types";

interface ChatTabProps {
  messages: ChatMessage[];
  messagesLoading: boolean;
  messagesError: string | null;
  messageInput: string;
  setMessageInput: (value: string) => void;
  handleMessageKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  membersError: string | null;
}

export default function ChatTab({
  messages,
  messagesLoading,
  messagesError,
  messageInput,
  setMessageInput,
  handleMessageKeyDown,
  handleSendMessage,
  messagesEndRef,
  membersError,
}: ChatTabProps) {
  return (
    <div className="flex min-h-0 flex-1 w-full flex-col">
      {/* Chat header */}
      <div className="shrink-0 border-b border-border-color px-5 py-4">
        <h2 className="text-[15px] font-medium text-secondary-title">
          Room Chat
        </h2>

        <p className="mt-1 text-[12px] text-gray-muted">
          Chat with your room members
        </p>
      </div>

      {/* Messages */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        {messagesLoading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-[13px] text-gray-muted">Loading messages...</p>
          </div>
        ) : messagesError ? (
          <div className="flex h-full items-center justify-center px-5 text-center">
            <p className="text-[13px] text-red-400">{membersError}</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <MessageCircle
              size={38}
              strokeWidth={1}
              className="text-gray-light"
            />

            <p className="mt-4 text-[14px] font-medium text-secondary-title">
              No messages yet
            </p>

            <p className="mt-1 max-w-[220px] text-[12px] leading-5 text-gray-light">
              Start a conversation with your room members.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message._id} className="flex gap-3">
                {/* Avatar */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-accent-muted">
                  <span className="text-[12px] font-medium text-primary">
                    {message.sender.name?.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Message */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[13px] font-medium text-secondary-title">
                      {message.sender.name}
                    </span>

                    <span className="shrink-0 text-[10px] text-gray-muted">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="mt-1 break-words text-[13px] leading-5 text-gray-light">
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
              text-primary
              outline-none
              placeholder:text-gray-light
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
  );
}
