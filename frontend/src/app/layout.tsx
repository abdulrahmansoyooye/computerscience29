import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSC29 | Computer Science Learning Platform",
  description: "The official premium learning repository for CSC29 Computer Science students. Access notes, past questions, and more.",
  keywords: ["Computer Science", "Learning Materials", "CSC29", "University", "Lecture Notes"],
  authors: [{ name: "CSC29 IT Team" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-sans antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50"
        style={{
          //@ts-ignore
          "--font-sans": "'Inter', sans-serif",
          "--font-heading": "'Outfit', sans-serif",
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
