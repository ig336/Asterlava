import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asterlava",
  description: "Mission-native software for AI-native companies."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
