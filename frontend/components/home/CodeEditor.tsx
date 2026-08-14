"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import { Code2, Expand, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { useRoomStore } from "@/store/room.store";
import { api } from "@/api";
import { getSocket } from "@/socket/socket";
import useAuthStore from "@/store/auth.store";
import { toast } from "sonner";

export default function CodeEditor() {
  const [code, setCode] = useState("");

  const activeRoom = useRoomStore((state) => state.activeRoom);

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

  const handleJoinRoom = async () => {
    if (!activeRoom) return;

    try {
      setJoining(true);
      setError(null);

      await api.post(`/roomMember/rooms/${activeRoom._id}/join`);

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
      socket.emit("load-code", {
        roomId: activeRoom._id,
      });
    } catch (error: any) {
      console.error("Failed to join room:", error);
      toast.error("Failed to join room");

      setError(error?.response?.data?.message || "Failed to join CodeRoom.");
    } finally {
      setJoining(false);
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
      return;
    }

    setJoinRequired(false);
    setError(null);

    const token = useAuthStore.getState().accessToken;

    if (!token) {
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
      toast.error("Socket error");
      if (
        error.statusCode === 403 &&
        error.message === "You are not a member of this room."
      ) {
        toast.error("You are not a member of this room");
        setJoinRequired(true);
        setError(null);
        return;
      }

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
  }, [activeRoom]);

  /*
   * No room selected
   */
  if (!activeRoom) {
    return (
      <section className="flex min-w-0 flex-col overflow-hidden rounded-[16px] border border-border-color bg-surface">
        <header className="flex h-[79px] shrink-0 items-center border-b border-border-color px-7">
          <div className="flex items-center gap-3">
            <Code2 size={23} className="text-green-accent" strokeWidth={2.3} />

            <span className="hidden text-[21px] font-medium text-[#eceef4] md:block">
              Code
            </span>

            <span className="block text-[21px] font-medium text-[#eceef4] md:hidden">
              Coderooms
            </span>
          </div>

          <div className="ml-auto flex items-center gap-5">
            <button
              className="text-[#d9dde5] transition-colors hover:text-white"
              aria-label="Toggle theme"
            >
              <Sun size={24} strokeWidth={1.8} />
            </button>

            <button
              className="text-[#d9dde5] transition-colors hover:text-white"
              aria-label="Fullscreen"
            >
              <Expand size={23} strokeWidth={1.8} />
            </button>
          </div>
        </header>

        <div className="flex min-h-[81vh] flex-1 items-center justify-center">
          <div className="text-center">
            <Code2
              size={32}
              className="mx-auto text-[#505866]"
              strokeWidth={1.6}
            />

            <h2 className="mt-4 text-[16px] font-medium text-[#dfe2e8]">
              No CodeRoom selected
            </h2>

            <p className="mt-2 text-[13px] text-[#777f8e]">
              Select or create a CodeRoom to start coding.
            </p>
          </div>
        </div>

        <footer className="flex h-[79px] shrink-0 items-center border-t border-border-color px-7">
          <span className="font-mono text-[15px] text-[#aeb4c0]">
            Ln 1, Col 1
          </span>
        </footer>
      </section>
    );
  }

  return (
    <section className="flex min-w-0 flex-col overflow-hidden rounded-[16px] border border-border-color bg-surface">
      {/* Editor header */}
      <header className="flex h-[79px] shrink-0 items-center border-b border-border-color px-7">
        <div className="flex h-full items-center gap-3 px-2 pl-11 md:pl-2">
          <Code2 size={23} className="text-green-accent" strokeWidth={2.3} />

          <span className="text-[21px] font-medium text-[#eceef4] hidden md:block">
            {activeRoom.name}
          </span>
          <span className="text-[21px] font-medium text-[#eceef4] block md:hidden">
            {activeRoom.name}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-5">
          <button
            className="text-[#d9dde5] transition-colors hover:text-white"
            aria-label="Toggle theme"
          >
            <Sun size={24} strokeWidth={1.8} />
          </button>

          <button
            className="text-[#d9dde5] transition-colors hover:text-white"
            aria-label="Fullscreen"
          >
            <Expand size={23} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {joinRequired ? (
        <div className="flex h-full items-center justify-center">
          <div className="w-full max-w-[380px] px-6 text-center">
            <div
              className="
                  mx-auto flex h-12 w-12
                  items-center justify-center
                  rounded-[12px]
                  bg-surface-muted
                  text-green-accent
                "
            >
              <Code2 size={23} strokeWidth={2} />
            </div>

            <h2 className="mt-5 text-[17px] font-semibold text-[#e4e6ec]">
              Join this CodeRoom
            </h2>

            <p className="mt-2 text-[13px] leading-5 text-[#858c9b]">
              You are not a member of this public CodeRoom. Join the room to
              view and collaborate on the code.
            </p>

            <button
              onClick={handleJoinRoom}
              disabled={joining}
              className="
                mt-6
                h-11
                rounded-[9px]
                bg-green-accent
                px-6
                text-[14px]
                font-medium
                text-white
                transition-opacity
                hover:opacity-90
                disabled:pointer-events-none
                disabled:opacity-50
              "
            >
              {joining ? "Joining..." : "Join CodeRoom"}
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-[13px] text-[#858c9b]">Loading code...</p>
        </div>
      ) : error ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-[13px] text-red-400">{error}</p>
        </div>
      ) : (
        <Editor
          height="100%"
          className="h-[80vh]"
          language={activeRoom.language}
          theme="vs-dark"
          onMount={handleEditorMount}
          value={code}
          onChange={(value) => {
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
          }}
          options={{
            automaticLayout: true,

            minimap: {
              enabled: false,
            },

            fontSize: 16,

            lineHeight: 28,

            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",

            padding: {
              top: 25,
              bottom: 25,
            },

            lineNumbers: "on",

            glyphMargin: false,

            folding: true,

            scrollBeyondLastLine: false,

            wordWrap: "off",

            tabSize: 2,

            insertSpaces: true,

            renderWhitespace: "selection",

            smoothScrolling: true,

            cursorBlinking: "smooth",

            cursorSmoothCaretAnimation: "on",

            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },

            overviewRulerLanes: 0,

            hideCursorInOverviewRuler: true,

            renderLineHighlight: "none",

            contextmenu: true,
          }}
        />
      )}

      {/* Status bar */}
      <footer className="flex h-[79px] shrink-0 items-center border-t border-border-color px-7">
        <span className="font-mono text-[15px] text-[#aeb4c0]">
          Ln {cursorPosition.line}, Col {cursorPosition.column}
        </span>

        <div className="ml-auto flex items-center gap-10">
          <span className="font-mono text-[15px] text-[#aeb4c0]">
            Spaces: {tabSize}
          </span>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[15px] capitalize text-[#aeb4c0]">
              {language}
            </span>

            <span className="h-3 w-3 rounded-full bg-[#65c97b]" />
          </div>
        </div>
      </footer>
    </section>
  );
}
