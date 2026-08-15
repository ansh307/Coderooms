interface CodeEditorStatusBarProps {
  line: number;
  column: number;
  tabSize: number;
  language: string;
}

export default function CodeEditorStatusBar({
  line,
  column,
  tabSize,
  language,
}: CodeEditorStatusBarProps) {
  return (
    <footer className="flex h-[79px] shrink-0 items-center border-t border-border-color px-7">
      <span className="font-mono text-[15px] text-[#aeb4c0]">
        Ln {line}, Col {column}
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
  );
}
