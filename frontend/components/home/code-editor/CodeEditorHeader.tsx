import { Code2, Expand, Sun, Play, Pause, Moon } from "lucide-react";

import { useThemeStore } from "@/store/theme-store";

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
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

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
            <span className="text-[21px] font-medium text-primary-heading hidden md:block">
              {roomName}
            </span>

            <span className="text-[21px] font-medium text-primary-heading block md:hidden">
              {roomName}
            </span>
          </>
        ) : (
          <>
            <span className="hidden text-[21px] font-medium text-primary-heading md:block">
              Code
            </span>

            <span className="block text-[21px] font-medium text-primary-heading md:hidden">
              Coderooms
            </span>
          </>
        )}
      </div>

      <div className="ml-auto flex items-center gap-5">
        <button
          type="button"
          onClick={toggleTheme}
          className="text-primary-heading hover:opacity-70"
          aria-label="Toggle theme"
          title={`Theme: ${theme}`}
        >
          {theme === "dark" ? (
            <Sun size={24} strokeWidth={1.8} />
          ) : (
            <Moon size={24} strokeWidth={1.8} />
          )}
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
              px-3
              text-[12px]
              text-primary-heading
              transition-colors
              hover:text-primary-heading
              font-medium
              hover:opacity-90
              disabled:pointer-events-none
              disabled:opacity-50
            "
            title={running ? "Running..." : "Run"}
          >
            {running ? <Pause size={23} /> : <Play size={23} />}
          </button>
        )}

        <button
          className="text-primary-heading hover:text-primary"
          aria-label="Fullscreen"
        >
          <Expand size={23} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
