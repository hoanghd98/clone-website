import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Công ty TNHH Thương Mại Dịch Vụ Phát Triển Kỹ Thuật Nam Phương",
  description: "Công ty TNHH Thương Mại Dịch Vụ Phát Triển Kỹ Thuật Nam Phương",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
