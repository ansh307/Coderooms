import {
  useEffect,
  useRef,
  useState,
} from "react";

import { api } from "@/api";
import { getSocket } from "@/socket/socket";
import useAuthStore from "@/store/auth.store";
import { useRoomStore } from "@/store/room.store";
import { toast } from "sonner";

import type { ChatMessage } from "@/components/home/members-panel/types";

interface UseRoomChatProps {
  isMember: boolean;
  isCheckingMembership: boolean | null;
}

export function useRoomChat({
  isMember,
  isCheckingMembership,
}: UseRoomChatProps) {
  const activeRoom = useRoomStore(
    (state) => state.activeRoom,
  );

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [messageInput, setMessageInput] =
    useState("");

  const [messagesLoading, setMessagesLoading] =
    useState(false);

  const [messagesError, setMessagesError] =
    useState<string | null>(null);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  /*
   * Fetch Messages
   */

  useEffect(() => {
    if (!activeRoom) {
      setMessages([]);
      return;
    }

    const roomId = activeRoom._id;

    if (isCheckingMembership) {
      return;
    }

    if (!isMember) {
      setMessagesError(
        "You are not a member of this room.",
      );
      return;
    }

    const fetchMessages = async () => {
      try {
        setMessagesLoading(true);
        setMessagesError(null);

        const response = await api.get(
          `/rooms/${roomId}/messages`,
        );

        setMessages(
          response.data.data ?? response.data ?? [],
        );
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to load messages",
        );

        setMessagesError(
          error?.response?.data?.message ||
            "Failed to load messages.",
        );

        setMessages([]);
      } finally {
        setMessagesLoading(false);
      }
    };

    fetchMessages();
  }, [
    activeRoom,
    isMember,
    isCheckingMembership,
  ]);

  /*
   * ReceiveMessage
   */

  useEffect(() => {
    if (!activeRoom) return;

    const token =
      useAuthStore.getState().accessToken;

    if (!token) return;

    const socket = getSocket(token);

    const handleReceiveMessage = (
      message: ChatMessage,
    ) => {
      if (message.room !== activeRoom._id) {
        return;
      }

      setMessages((prev) => {
        // Prevent duplicate messages
        if (
          prev.some(
            (item) => item._id === message._id,
          )
        ) {
          return prev;
        }

        return [...prev, message];
      });
    };

    socket.on(
      "receive-message",
      handleReceiveMessage,
    );

    return () => {
      socket.off(
        "receive-message",
        handleReceiveMessage,
      );
    };
  }, [activeRoom]);

  /*
   * Scroll to bottom
   */

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

    const token =
      useAuthStore.getState().accessToken;

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
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return {
    messages,
    messageInput,
    setMessageInput,
    messagesLoading,
    messagesError,
    messagesEndRef,
    handleSendMessage,
    handleMessageKeyDown,
  };
}