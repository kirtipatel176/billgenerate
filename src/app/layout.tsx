import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HydroCool Services – Estimate & Quotation Generator",
    template: "%s | HydroCool Services",
  },
  description:
    "HydroCool Services – Professional estimate and quotation generator for AC, RO, Geyser & Washing Machine repair and installation. Create, preview, and download A4 PDF quotes instantly.",
  keywords: [
    "HydroCool",
    "estimate generator",
    "quotation",
    "AC service",
    "RO service",
    "geyser repair",
    "washing machine",
    "Gandhinagar",
    "GIFT City",
    "invoice",
    "PDF download",
  ],
  authors: [{ name: "HydroCool Services", url: "https://hydrocoolservices.in" }],
  creator: "HydroCool Services",
  publisher: "HydroCool Services",
  applicationName: "HydroCool Estimate Generator",
  category: "Business",

  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.svg",
    shortcut: "/logo.svg",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "HydroCool Services",
    title: "HydroCool Services – Estimate & Quotation Generator",
    description:
      "Create professional estimates for AC, RO, Geyser & Washing Machine services. Download A4 PDF quotations instantly.",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "HydroCool Services Logo",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "HydroCool Services – Estimate Generator",
    description: "Professional estimate & PDF quotation generator for home appliance services.",
    images: ["/logo.svg"],
  },

  robots: {
    index: false, // Private business tool — keep off search engines
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1e3a8a" },
    { media: "(prefers-color-scheme: dark)", color: "#1e3a8a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        {/* Explicit SVG favicon for maximum browser support */}
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <meta name="application-name" content="HydroCool Estimate Generator" />
        <meta name="msapplication-TileColor" content="#1e3a8a" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
