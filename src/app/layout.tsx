import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IMOSES Clone",
  description: "Clone of IMOSES website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
