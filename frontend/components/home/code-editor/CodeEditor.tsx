import CodeEditorEmpty from "./CodeEditorEmpty";
import CodeEditorHeader from "./CodeEditorHeader";
import CodeEditorJoin from "./CodeEditorJoin";
import CodeEditorMonaco from "./CodeEditorMonaco";
import CodeEditorStatusBar from "./CodeEditorStatusBar";

import useCodeEditor from "@/hooks/room/useCodeEditor";
import CodeEditorOutput from "./CodeEditorOutput";
import { useEffect, useState } from "react";

type OutputPosition = "bottom" | "right";
type OutputSizes = 200 | 300 | 400 | 500 | 600;

export default function CodeEditor() {
  const [outputOpen, setOutputOpen] = useState(false);
  const [outputPosition, setOutputPosition] =
    useState<OutputPosition>("bottom");

  const [outputSize, setOutputSize] = useState<OutputSizes>(400);

  const {
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
  } = useCodeEditor();

  /*
   * Auto open Output when running code
   */
  useEffect(() => {
    if (running) {
      setOutputOpen(true);
    }
  }, [running]);

  /*
   * Handle keyboard shortcuts
   * Ctrl/Cmd + Enter -> Run Code
   * Ctrl/Cmd + J     -> Toggle Output
   */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isRunShortcut =
        (event.ctrlKey || event.metaKey) && event.key === "Enter";

      const isOutputShortcut =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "j";

      if (isRunShortcut) {
        // Don't run if the editor is disabled/not joined
        if (joinRequired || running) return;

        event.preventDefault();
        handleRunCode();
        return;
      }

      if (isOutputShortcut) {
        if (!activeRoom) return;

        event.preventDefault();
        setOutputOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleRunCode, joinRequired, running]);

  /*
   * No room selected
   */

  if (!activeRoom) {
    return (
      <section className="flex min-w-0 flex-col overflow-hidden rounded-[16px] border border-border-color bg-surface">
        <CodeEditorHeader />

        <CodeEditorEmpty />

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

      <CodeEditorHeader
        roomName={activeRoom.name}
        running={running}
        disabled={joinRequired}
        onRun={handleRunCode}
      />

      <div
        className={`min-h-0 min-w-0 flex-1 ${
          outputOpen && outputPosition === "right"
            ? "flex flex-row"
            : "flex flex-col"
        }`}
      >
        {/* Monaco */}
        <div className="min-h-0 min-w-0 flex-1">
          {joinRequired ? (
            <CodeEditorJoin joining={joining} onJoin={handleJoinRoom} />
          ) : loading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-[13px] text-[#858c9b]">Loading code...</p>
            </div>
          ) : error ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-[13px] text-red-400">{error}</p>
            </div>
          ) : (
            <CodeEditorMonaco
              code={code}
              language={activeRoom.language}
              onMount={handleEditorMount}
              onChange={handleCodeChange}
            />
          )}
        </div>

        {/* Output */}
        {outputOpen && (
          <CodeEditorOutput
            result={executionResult}
            error={executionError}
            running={running}
            position={outputPosition}
            outputSize={outputSize}
            setOutputSize={setOutputSize}
            onTogglePosition={() =>
              setOutputPosition((prev) =>
                prev === "bottom" ? "right" : "bottom",
              )
            }
          />
        )}
      </div>

      {/* Status bar */}

      <CodeEditorStatusBar
        line={cursorPosition.line}
        column={cursorPosition.column}
        tabSize={tabSize}
        language={language}
        outputOpen={outputOpen}
        onToggleOutput={() => setOutputOpen((prev) => !prev)}
      />
    </section>
  );
}
