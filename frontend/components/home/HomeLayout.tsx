"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CodeEditor from "./CodeEditor";
import MembersPanel from "./MembersPanel";

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [membersOpen, setMembersOpen] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1600px)");

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setSidebarOpen(true);
        setMembersOpen(true);
      } else {
        setSidebarOpen(false);
        setMembersOpen(false);
      }
    };

    // Initial state
    if (!mediaQuery.matches) {
      setSidebarOpen(false);
      setMembersOpen(false);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <main className="h-screen overflow-hidden bg-primary-foreground p-[10px] text-white">
      <div
        className={`
          grid h-full gap-[10px]
          transition-[grid-template-columns]
          duration-300
          ease-in-out

          ${
            sidebarOpen && membersOpen
              ? "grid-cols-[396px_minmax(0,1fr)_396px]"
              : sidebarOpen
                ? "grid-cols-[396px_minmax(0,1fr)_60px]"
                : membersOpen
                  ? "grid-cols-[60px_minmax(0,1fr)_396px]"
                  : "grid-cols-[60px_minmax(0,1fr)_60px]"
          }
        `}
      >
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
        />

        <CodeEditor />

        <MembersPanel
          open={membersOpen}
          onToggle={() => setMembersOpen((prev) => !prev)}
        />
      </div>
    </main>
  );
}
