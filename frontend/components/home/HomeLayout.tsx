"use client";

import { useEffect, useState } from "react";
import { Menu, UsersRound, X } from "lucide-react";

import Sidebar from "./sidebar/Sidebar";
import CodeEditor from "./code-editor/CodeEditor";
import MembersPanel from "./members-panel/MembersPanel";

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [membersOpen, setMembersOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const desktopQuery = window.matchMedia("(min-width: 1600px)");

    const updateLayout = () => {
      const mobile = mobileQuery.matches;
      const desktop = desktopQuery.matches;

      setIsMobile(mobile);

      if (mobile) {
        // Mobile:
        // Panels are completely hidden and opened as drawers.
        setSidebarOpen(false);
        setMembersOpen(false);
      } else if (desktop) {
        // Large desktop:
        // Panels are fully expanded.
        setSidebarOpen(true);
        setMembersOpen(true);
      } else {
        // Tablet / laptop:
        // Panels become collapsed 60px rails.
        setSidebarOpen(false);
        setMembersOpen(false);
      }
    };

    // Initial layout
    updateLayout();

    mobileQuery.addEventListener("change", updateLayout);
    desktopQuery.addEventListener("change", updateLayout);

    return () => {
      mobileQuery.removeEventListener("change", updateLayout);
      desktopQuery.removeEventListener("change", updateLayout);
    };
  }, []);

  /*
   * MOBILE
   */
  if (isMobile) {
    return (
      <main className="relative h-screen overflow-hidden bg-primary-foreground p-[6px] text-primary">
        {/* Editor */}
        <div className="h-full w-full">
          <CodeEditor />
        </div>

        {/* Mobile Sidebar Button */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="
              fixed
              left-6
              top-6
              z-40
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-[10px]
              border
              border-border-color
              bg-surface-muted
              text-[#d8dce5]
              shadow-lg
              backdrop-blur-md
              transition-all
            "
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Mobile Members Button */}
        {!membersOpen && (
          <button
            onClick={() => setMembersOpen(true)}
            className="
              fixed
              right-4
              top-6
              z-40
              flex
              h-10
              w-11
              items-center
              justify-center
              rounded-[10px]
              bg-surface
              text-[#d8dce5]
              transition-all
              hover:bg-surface-muted
            "
            aria-label="Open members panel"
          >
            <UsersRound size={19} />
          </button>
        )}

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <div
              className="
                fixed
                inset-0
                z-40
                bg-black/50
                backdrop-blur-[2px]
              "
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <div
              className="
                fixed
                bottom-2
                left-2
                top-2
                z-50
                w-[calc(100vw-24px)]
                max-w-[360px]
                animate-in
                slide-in-from-left
                duration-200
              "
            >
              <Sidebar open={true} onToggle={() => setSidebarOpen(false)} />
            </div>
          </>
        )}

        {/* Mobile Members Overlay */}
        {membersOpen && (
          <>
            {/* Backdrop */}
            <div
              className="
                fixed
                inset-0
                z-40
                bg-black/50
                backdrop-blur-[2px]
              "
              onClick={() => setMembersOpen(false)}
            />

            {/* Members Panel */}
            <div
              className="
                fixed
                bottom-2
                right-2
                top-2
                z-50
                w-[calc(100vw-24px)]
                max-w-[360px]
                animate-in
                slide-in-from-right
                duration-200
              "
            >
              <MembersPanel
                open={true}
                onToggle={() => setMembersOpen(false)}
              />
            </div>
          </>
        )}
      </main>
    );
  }

  /*
   * DESKTOP / TABLET
   *
   * This part stays exactly the same.
   */
  return (
    <main className="h-screen overflow-hidden bg-primary-foreground p-[10px] text-primary">
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
