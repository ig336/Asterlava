import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asterlava",
  description: "The perception layer for high-stakes human conversation."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
