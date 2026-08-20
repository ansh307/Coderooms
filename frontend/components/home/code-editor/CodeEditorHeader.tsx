import { Code2, Expand, Sun, Play } from "lucide-react";

interface CodeEditorHeaderProps {
  roomName?: string;
  running?: boolean;
  disabled?: boolean;
  onRun?: () => void;
}
export default function CodeEditorHeader({
  roomName,
  disabled,
  onRun,
  running,
}: CodeEditorHeaderProps) {
  return (
    <header className="flex h-[79px] shrink-0 items-center border-b border-border-color px-7">
      <div
        className={
          roomName
            ? "flex h-full items-center gap-3 px-2 pl-11 md:pl-2"
            : "flex items-center gap-3"
        }
      >
        <Code2 size={23} className="text-green-accent" strokeWidth={2.3} />

        {roomName ? (
          <>
            <span className="text-[21px] font-medium text-[#eceef4] hidden md:block">
              {roomName}
            </span>

            <span className="text-[21px] font-medium text-[#eceef4] block md:hidden">
              {roomName}
            </span>
          </>
        ) : (
          <>
            <span className="hidden text-[21px] font-medium text-[#eceef4] md:block">
              Code
            </span>

            <span className="block text-[21px] font-medium text-[#eceef4] md:hidden">
              Coderooms
            </span>
          </>
        )}
      </div>

      <div className="ml-auto flex items-center gap-5">
        <button
          className="text-[#d9dde5] transition-colors hover:text-white"
          aria-label="Toggle theme"
        >
          <Sun size={24} strokeWidth={1.8} />
        </button>

        {roomName && (
          <button
            type="button"
            onClick={onRun}
            disabled={disabled || running}
            className="
              flex
              h-8
              items-center
              gap-2
              rounded-[8px]
              bg-green-accent
              px-3
              text-[12px]
              font-medium
              text-white
              transition-opacity
              hover:opacity-90
              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            <Play size={13} fill="currentColor" />

            {running ? "Running..." : "Run"}
          </button>
        )}

        <button
          className="text-[#d9dde5] transition-colors hover:text-white"
          aria-label="Fullscreen"
        >
          <Expand size={23} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
