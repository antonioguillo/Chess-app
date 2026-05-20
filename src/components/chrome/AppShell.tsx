"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { TabBar } from "./TabBar";

/**
 * Outer shell — centers the app inside a phone-width column, adds a status-bar
 * spacer at the top, and renders the floating tab bar on tab pages.
 *
 * The detail screen (`/apertura/*`) intentionally hides the tab bar to give
 * the board and commentary the full height (full-screen reading mode).
 */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideTabBar = pathname.startsWith("/apertura/");

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 402,
          minHeight: "100dvh",
          position: "relative",
          background: "var(--bg)",
          paddingTop: 12,
        }}
      >
        {children}
      </div>
      {!hideTabBar && <TabBar />}
    </div>
  );
}
