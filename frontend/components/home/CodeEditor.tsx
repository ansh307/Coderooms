"use client";

import { Code2, Expand, Sun } from "lucide-react";
import { useState } from "react";

export default function CodeEditor() {
  const [code, setCode] = useState("");

  return (
    <section className="flex min-w-0 flex-col overflow-hidden rounded-[16px] border border-border-color bg-surface">
      {/* Editor header */}
      <header className="flex h-[79px] shrink-0 items-center border-b border-border-color px-7">
        <div className="flex h-full items-center gap-3 px-2 pl-11 md:pl-2">
          <Code2 size={23} className="text-green-accent" strokeWidth={2.3} />

          <span className="text-[21px] font-medium text-[#eceef4] hidden md:block">
            Code
          </span>
          <span className="text-[21px] font-medium text-[#eceef4] block md:hidden">
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

      {/* Editor */}
      <div className="relative min-h-[81vh] flex-1 overflow-hidden">
        <div className="absolute inset-0 flex">
          {/* Line numbers */}
          <div className="w-[72px] shrink-0 border-r border-border-color pt-[30px] text-center">
            <span className="font-mono text-[17px] text-[#858c9b]">1</span>
          </div>

          {/* Code input */}
          <div className="relative min-w-0 flex-1">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              className="
                absolute inset-0
                resize-none
                bg-transparent
                px-7
                py-[25px]
                font-mono
                text-[16px]
                leading-7
                text-[#e6e9ef]
                outline-none
                placeholder:text-[#4e5563]
              "
              placeholder=""
            />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <footer className="flex h-[79px] shrink-0 items-center border-t border-border-color px-7">
        <span className="font-mono text-[15px] text-[#aeb4c0]">
          Ln 1, Col 1
        </span>

        <div className="ml-auto flex items-center gap-10">
          <span className="font-mono text-[15px] text-[#aeb4c0]">
            Spaces: 2
          </span>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[15px] text-[#aeb4c0]">
              JavaScript
            </span>

            <span className="h-3 w-3 rounded-full bg-[#65c97b]" />
          </div>
        </div>
      </footer>
    </section>
  );
}
