import { CodeExecutionResult } from "@/types/code";

interface CodeEditorOutputProps {
  result: CodeExecutionResult | null;
  error: string | null;
  running: boolean;
}

export default function CodeEditorOutput({
  result,
  error,
  running,
}: CodeEditorOutputProps) {
  const compileError = result?.compile?.stderr || result?.compile?.output;

  const runtimeError = result?.run?.stderr;

  return (
    <div
      className="
        flex
        h-[300px]
        shrink-0
        flex-col
        border-t
        border-border-color
        bg-surface
      "
    >
      {/* Header */}

      <div
        className="
          flex
          h-9
          shrink-0
          items-center
          justify-between
          border-b
          border-border-color
          px-4
        "
      >
        <span
          className="
            text-[11px]
            font-medium
            uppercase
            tracking-wide
            text-[#777f8e]
          "
        >
          {running
            ? "Running"
            : error
              ? "Error"
              : compileError
                ? "Compilation Error"
                : "Output"}
        </span>

        {result?.run?.wallTime != null && (
          <span className="font-mono text-[10px] text-[#606775]">
            {result.run.wallTime}ms
          </span>
        )}
      </div>

      {/* Body */}

      <div className="code-output-scrollbar min-h-0 flex-1 overflow-auto p-4">
        {running ? (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-accent" />

            <span className="font-mono text-[12px] text-[#858c9b]">
              Executing code...
            </span>
          </div>
        ) : error ? (
          <pre
            className="
              whitespace-pre-wrap
              font-mono
              text-[12px]
              text-red-400
            "
          >
            {error}
          </pre>
        ) : compileError ? (
          <pre
            className="
              whitespace-pre-wrap
              font-mono
              text-[12px]
              text-red-400
            "
          >
            {compileError}
          </pre>
        ) : runtimeError ? (
          <>
            {result?.run?.stdout && (
              <pre
                className="
                  whitespace-pre-wrap
                  font-mono
                  text-[12px]
                  text-[#d8dce5]
                "
              >
                {result.run.stdout}
              </pre>
            )}

            <pre
              className="
                mt-2
                whitespace-pre-wrap
                font-mono
                text-[12px]
                text-red-400
              "
            >
              {runtimeError}
            </pre>
          </>
        ) : (
          <pre
            className="
              whitespace-pre-wrap
              font-mono
              text-[12px]
              text-[#d8dce5]
            "
          >
            {result?.run?.stdout ||
              result?.run?.output ||
              "Process finished with no output."}
          </pre>
        )}
      </div>
    </div>
  );
}
