import { OnMount } from "@monaco-editor/react";
import { useEffect, useState } from "react";

import { useRoomStore } from "@/store/room.store";
import { api } from "@/api";
import { getSocket } from "@/socket/socket";
import useAuthStore from "@/store/auth.store";
import { toast } from "sonner";
import { CodeExecutionResult } from "@/types/code";

export default function useCodeEditor() {
  const [code, setCode] = useState("");

  const activeRoom = useRoomStore((state) => state.activeRoom);

  const joinedRooms = useRoomStore((state) => state.joinedRooms);

  const membershipLoading = useRoomStore((state) => state.membershipLoading);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [joinRequired, setJoinRequired] = useState(false);

  const [joining, setJoining] = useState(false);

  const [cursorPosition, setCursorPosition] = useState({
    line: 1,
    column: 1,
  });

  const [tabSize, setTabSize] = useState(2);

  const [language, setLanguage] = useState("javascript");

  const [running, setRunning] = useState(false);

  const [executionResult, setExecutionResult] =
    useState<CodeExecutionResult | null>(null);

  const [executionError, setExecutionError] = useState<string | null>(null);

  /*
   * Membership
   */

  const roomMembership = activeRoom ? joinedRooms[activeRoom._id] : undefined;

  const isMember = roomMembership === true;

  const isCheckingMembership =
    activeRoom &&
    (roomMembership === undefined ||
      membershipLoading[activeRoom._id] === true);

  /*
   * Monaco editor mount
   */

  const handleEditorMount: OnMount = (editor) => {
    const model = editor.getModel();

    if (model) {
      setTabSize(model.getOptions().tabSize);
    }

    editor.onDidChangeCursorPosition((event) => {
      setCursorPosition({
        line: event.position.lineNumber,
        column: event.position.column,
      });
    });
  };

  /*
   * Join Room
   */

  const handleJoinRoom = async () => {
    if (!activeRoom) return;

    try {
      setJoining(true);
      setError(null);

      await api.post(`/roomMember/rooms/${activeRoom._id}/join`);

      useRoomStore.getState().setRoomJoined(activeRoom._id);

      setJoinRequired(false);

      const token = useAuthStore.getState().accessToken;

      if (!token) {
        setError("Authentication token not found.");
        return;
      }

      const socket = getSocket(token);

      /*
       * Now that membership exists,
       * join the Socket.IO room.
       */
      socket.emit("join-room", {
        roomId: activeRoom._id,
      });

      /*
       * Then ask the backend for the latest code.
       */
      // socket.emit("load-code", {
      //   roomId: activeRoom._id,
      // });

      toast.success("Room joined successfully");
    } catch (error: any) {
      // console.error("Failed to join room:", error);
      toast.error("Failed to join room");

      setError(error?.response?.data?.message || "Failed to join CodeRoom.");
    } finally {
      setJoining(false);
    }
  };

  /*
   * Run Code
   */
  const handleRunCode = async () => {
    if (!activeRoom) {
      return;
    }

    if (joinRequired) {
      toast.error("Join the room before running code.");
      return;
    }

    if (!code.trim()) {
      toast.error("Write some code before running it.");
      return;
    }

    try {
      setRunning(true);
      setExecutionError(null);
      setExecutionResult(null);

      const response = await api.post("rooms/code/execute", {
        roomId: activeRoom._id,
        language,
        code,
      });

      setExecutionResult(response.data.data);
    } catch (error: any) {
      console.error("Failed to execute code:", error);

      const message =
        error?.response?.data?.message || "Failed to execute code.";

      setExecutionError(message);

      toast.error(message);
    } finally {
      setRunning(false);
    }
  };

  /*
   * Load code whenever the active room changes.
   */
  useEffect(() => {
    if (!activeRoom) {
      setCode("");
      setLanguage("javascript");
      setJoinRequired(false);
      setError(null);
      setLoading(false);
      return;
    }

    /*
     * Immediately clear previous room state.
     */
    setCode("");
    setLanguage(activeRoom.language || "javascript");
    setError(null);

    /*
     * Don't show editor while membership is being checked.
     */
    if (isCheckingMembership) {
      setLoading(true);
      return;
    }

    /*
     * User hasn't joined this room.
     */
    if (!isMember) {
      setLoading(false);
      setJoinRequired(true);
      return;
    }

    setJoinRequired(false);
    setLoading(true);

    const token = useAuthStore.getState().accessToken;

    if (!token) {
      setLoading(false);
      setError("Authentication token not found.");
      return;
    }

    const socket = getSocket(token);

    const handleConnect = () => {
      socket.emit("join-room", {
        roomId: activeRoom._id,
      });

      socket.emit("load-code", {
        roomId: activeRoom._id,
      });
    };

    const handleCodeLoaded = (data: {
      room: string;
      content: string;
      language: string;
      version: number;
      updatedAt: string;
      updatedBy: string;
    }) => {
      if (data.room !== activeRoom._id) {
        return;
      }

      setCode(data.content ?? "");

      setLanguage(data.language || activeRoom.language || "javascript");

      setLoading(false);
    };

    const handleCodeUpdated = (data: {
      roomId: string;
      content: string;
      language: string;
      version: number;
      updatedAt: string;
      updatedBy: string;
    }) => {
      if (data.roomId !== activeRoom._id) {
        return;
      }

      setCode(data.content ?? "");

      setLanguage(data.language || activeRoom.language || "javascript");
    };

    const handleSocketError = (error: {
      message?: string;
      statusCode?: number;
    }) => {
      // console.error("Socket error:", error);
      // toast.error("Socket error");

      if (
        error.statusCode === 403 &&
        error.message === "You are not a member of this room."
      ) {
        toast.error("You are not a member of this room");

        setLoading(false);
        setJoinRequired(true);
        setError(null);

        return;
      }

      setLoading(false);
      setError(error.message || "Socket error occurred.");
    };

    socket.on("connect", handleConnect);
    socket.on("code-loaded", handleCodeLoaded);
    socket.on("code-updated", handleCodeUpdated);
    socket.on("socket-error", handleSocketError);

    if (!socket.connected) {
      socket.connect();
    } else {
      handleConnect();
    }

    return () => {
      socket.emit("leave-room", {
        roomId: activeRoom._id,
      });

      socket.off("connect", handleConnect);
      socket.off("code-loaded", handleCodeLoaded);
      socket.off("code-updated", handleCodeUpdated);
      socket.off("socket-error", handleSocketError);
    };
  }, [activeRoom, isMember, isCheckingMembership]);

  /*
   * Monaco code change
   */

  const handleCodeChange = (value: string | undefined) => {
    const newContent = value ?? "";

    setCode(newContent);

    if (!activeRoom) {
      return;
    }

    const token = useAuthStore.getState().accessToken;

    if (!token) {
      return;
    }

    const socket = getSocket(token);

    if (!socket.connected) {
      return;
    }

    socket.emit("code-change", {
      roomId: activeRoom._id,
      content: newContent,
      language,
    });
  };

  return {
    activeRoom,

    code,
    language,
    loading,
    error,
    joinRequired,
    joining,

    cursorPosition,
    tabSize,

    running,
    executionResult,
    executionError,

    handleEditorMount,
    handleJoinRoom,
    handleCodeChange,
    handleRunCode,
  };
}
