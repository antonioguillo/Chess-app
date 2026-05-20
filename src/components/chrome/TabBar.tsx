"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/Icon";

interface Item {
  href: string;
  label: string;
  icon: IconName;
}

const ITEMS: Item[] = [
  { href: "/", label: "Inicio", icon: "home" },
  { href: "/biblioteca", label: "Biblioteca", icon: "book" },
  { href: "/practica", label: "Práctica", icon: "target" },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function TabBar() {
  const pathname = usePathname();
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: 26,
        paddingTop: 10,
        background:
          "linear-gradient(180deg, rgba(15,13,10,0) 0%, rgba(15,13,10,0.95) 38%, #0f0d0a 60%)",
        zIndex: 30,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 402,
          margin: "0 16px",
          background: "rgba(28,24,20,0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(241,234,215,0.08)",
          borderRadius: 22,
          padding: "6px",
          display: "flex",
          boxShadow:
            "0 14px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
          pointerEvents: "auto",
        }}
      >
        {ITEMS.map((it) => {
          const a = isActive(it.href, pathname);
          return (
            <Link
              key={it.href}
              href={it.href}
              style={{
                flex: 1,
                padding: "8px 4px",
                background: a ? "rgba(199,155,101,0.13)" : "transparent",
                border: "none",
                borderRadius: 16,
                color: a ? "var(--gold)" : "var(--ink-mute)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                textDecoration: "none",
              }}
            >
              <Icon name={it.icon} size={18} />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: 0.3,
                }}
              >
                {it.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
