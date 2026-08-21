"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/theme-store";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(resolvedTheme);
    };

    applyTheme();

    mediaQuery.addEventListener("change", applyTheme);

    return () => {
      mediaQuery.removeEventListener("change", applyTheme);
    };
  }, [theme]);

  return children;
}
