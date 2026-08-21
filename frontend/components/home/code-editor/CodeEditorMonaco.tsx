import { useThemeStore } from "@/store/theme-store";
import Editor, { OnMount } from "@monaco-editor/react";
import { useEffect, useState } from "react";

interface CodeEditorMonacoProps {
  code: string;
  language: string;
  onMount: OnMount;
  onChange: (value: string | undefined) => void;
}

export default function CodeEditorMonaco({
  code,
  language,
  onMount,
  onChange,
}: CodeEditorMonacoProps) {
  const { theme } = useThemeStore();

  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    updateSystemTheme();

    mediaQuery.addEventListener("change", updateSystemTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateSystemTheme);
    };
  }, []);

  const resolvedTheme = theme === "system" ? systemTheme : theme;
  return (
    <Editor
      height="100%"
      language={language}
      theme={resolvedTheme === "dark" ? "vs-dark" : "vs-light"}
      onMount={onMount}
      value={code}
      onChange={onChange}
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
  );
}
