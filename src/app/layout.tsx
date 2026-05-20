import type { Metadata, Viewport } from "next";
import { EB_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { AppShell } from "@/components/chrome/AppShell";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gambito — Aprende todas las aperturas",
  description:
    "Cinco siglos de teoría de aperturas reunidos en doce líneas esenciales. Aprende a tu ritmo, una apertura cada día.",
  applicationName: "Gambito",
};

export const viewport: Viewport = {
  themeColor: "#0f0d0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${garamond.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
