import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Patient BMI Registry",
  description: "Secure clinical intake application for demographics and BMI review"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
