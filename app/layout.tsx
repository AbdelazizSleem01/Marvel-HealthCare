import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Marvel Group – Powering Healthcare Innovation",
  description: "The MENA region's premier medical-tech creative & technology group. We specialize in CME programs, medical education, digital health platforms, and creative healthcare communication across Egypt, UAE, and KSA.",
  keywords: [
    "Marvel Group",
    "medical",
    "pharma",
    "healthcare",
    "Egypt",
    "UAE",
    "KSA",
    "CME",
    "medical education",
    "digital health",
    "medical writing",
    "healthcare technology",
    "TebZone",
    "Med-ADD",
    "continuing medical education"
  ],
  authors: [{ name: "Marvel Group" }],
  creator: "Marvel Group",
  publisher: "Marvel Group",
  robots: "index, follow",
  metadataBase: new URL("https://marvel-health-care.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Marvel Group – Powering Healthcare Innovation",
    description: "The MENA region's premier medical-tech creative & technology group — transforming healthcare communication since 2015.",
    type: "website",
    locale: "en_US",
    siteName: "Marvel Group",
    url: "https://marvel-health-care.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marvel Group – Powering Healthcare Innovation",
    description: "The MENA region's premier medical-tech creative & technology group.",
    creator: "@marvelgroup",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon-16x16.png",
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
  appleWebApp: {
    title: "Marvel Group",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFF" },
    { media: "(prefers-color-scheme: dark)", color: "#030B18" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* Additional Meta Tags */}
        <meta name="apple-mobile-web-app-title" content="Marvel Group" />
        <meta name="application-name" content="Marvel Group" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} storageKey="marvel-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
