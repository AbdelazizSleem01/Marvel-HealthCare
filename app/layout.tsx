import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Marvel Group – Powering Healthcare Innovation",
  description: "Marvel Group is a leading medical-tech creative & technology group operating across Egypt, UAE, and KSA.",
  keywords: ["Marvel Group", "medical", "pharma", "healthcare", "Egypt", "UAE", "KSA"],
  openGraph: {
    title: "Marvel Group – Powering Healthcare Innovation",
    description: "Elite medical-tech creative & technology group across Egypt, UAE, KSA.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} storageKey="marvel-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
