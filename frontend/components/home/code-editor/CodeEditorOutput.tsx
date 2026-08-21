import { CodeExecutionResult } from "@/types/code";
import {
  Maximize2,
  SquareArrowOutDownLeft,
  SquareArrowOutUpRight,
} from "lucide-react";

interface CodeEditorOutputProps {
  result: CodeExecutionResult | null;
  error: string | null;
  running: boolean;
  position: OutputPosition;
  onTogglePosition: () => void;
  outputSize: OutputSizes;
  setOutputSize: (sizes: OutputSizes) => void;
}

type OutputSizes = 200 | 300 | 400 | 500 | 600;
type OutputPosition = "bottom" | "right";

export default function CodeEditorOutput({
  result,
  error,
  running,
  position,
  onTogglePosition,
  outputSize,
  setOutputSize,
}: CodeEditorOutputProps) {
  const compileError = result?.compile?.stderr || result?.compile?.output;

  const runtimeError = result?.run?.stderr;

  console.log(result);

  const handleToggleSize = () => {
    if (position === "right") {
      const sizes: OutputSizes[] = [400, 500, 600];

      const currentIndex = sizes.indexOf(outputSize);
      const nextSize = sizes[(currentIndex + 1) % sizes.length];

      setOutputSize(nextSize);
    } else {
      const sizes: OutputSizes[] = [200, 300, 400];

      const currentIndex = sizes.indexOf(outputSize);
      const nextSize = sizes[(currentIndex + 1) % sizes.length];

      setOutputSize(nextSize);
    }
  };

  return (
    <div
      className={`
        flex
        shrink-0
        flex-col
        border-border-color
        bg-surface
        ${position === "bottom" ? "w-full border-t" : "h-full border-l"}
      `}
      style={
        position === "right"
          ? { width: `${outputSize}px` }
          : { height: `${outputSize}px` }
      }
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
            text-gray-muted
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

        <div className="flex items-center gap-3">
          {result?.run?.wallTime != null && (
            <span className="font-mono text-[10px] text-gray-muted">
              {result.run.wallTime}ms
            </span>
          )}

          {/* Toggle size */}
          <button
            type="button"
            onClick={handleToggleSize}
            className="
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded
            text-gray-muted
            transition-colors
            hover:text-primary
          "
            title={`Expand to ${
              position === "bottom"
                ? outputSize === 200
                  ? 300
                  : outputSize === 300
                    ? 400
                    : 200
                : outputSize === 400
                  ? 500
                  : outputSize === 500
                    ? 600
                    : 400
            }`}
          >
            <Maximize2 className="h-4 w-4" />
          </button>

          {/* Position toggle */}
          <button
            type="button"
            onClick={onTogglePosition}
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded
              text-gray-muted
              transition-colors
              hover:text-primary
            "
            title={
              position === "bottom"
                ? "Move output to right"
                : "Move output to bottom"
            }
          >
            {position === "bottom" ? (
              <SquareArrowOutUpRight className="w-5 h-5" />
            ) : (
              <SquareArrowOutDownLeft className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Body */}

      <div className="code-output-scrollbar min-h-0 flex-1 overflow-auto p-4">
        {running ? (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-accent" />

            <span className="font-mono text-[12px] text-gray-muted">
              Executing code...
            </span>
          </div>
        ) : error ? (
          <pre className="whitespace-pre-wrap font-mono text-[12px] text-red-400">
            {error}
          </pre>
        ) : compileError ? (
          <pre className="whitespace-pre-wrap font-mono text-[12px] text-red-400">
            {compileError}
          </pre>
        ) : runtimeError ? (
          <>
            {result?.run?.stdout && (
              <pre className="whitespace-pre-wrap font-mono text-[12px] text-primary-heading">
                {result.run.stdout}
              </pre>
            )}

            <pre className="mt-2 whitespace-pre-wrap font-mono text-[12px] text-red-400">
              {runtimeError}
            </pre>
          </>
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-[12px] text-primary-heading">
            {result?.run?.stdout ||
              result?.run?.output ||
              "Process finished with no output."}
          </pre>
        )}
      </div>
    </div>
  );
}
