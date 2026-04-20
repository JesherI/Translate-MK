import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Translate-MK | Markdown ↔ Text Converter",
  description: "Real-time bidirectional Markdown to plain text converter. Auto-save, file import/export, and beautiful UI.",
  keywords: ["markdown", "converter", "text", "editor", "real-time", "localstorage"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}
