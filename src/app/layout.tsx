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
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const theme = localStorage.getItem('translate-mk-theme') || 'dark';
              if (theme === 'light') {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
              } else {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
              }
            })();
          `
        }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
