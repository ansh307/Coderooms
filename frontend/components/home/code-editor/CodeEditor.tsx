import CodeEditorEmpty from "./CodeEditorEmpty";
import CodeEditorHeader from "./CodeEditorHeader";
import CodeEditorJoin from "./CodeEditorJoin";
import CodeEditorMonaco from "./CodeEditorMonaco";
import CodeEditorStatusBar from "./CodeEditorStatusBar";

import useCodeEditor from "@/hooks/room/useCodeEditor";

export default function CodeEditor() {
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

    handleEditorMount,
    handleJoinRoom,
    handleCodeChange,
  } = useCodeEditor();

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

      <CodeEditorHeader roomName={activeRoom.name} />

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

      {/* Status bar */}

      <CodeEditorStatusBar
        line={cursorPosition.line}
        column={cursorPosition.column}
        tabSize={tabSize}
        language={language}
      />
    </section>
  );
}
