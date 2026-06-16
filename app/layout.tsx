import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://portfolio-subh2.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Subhadeep Mandal | MBA Student at XIMB | Portfolio",
  description:
    "Subhadeep Mandal is an engineer turned MBA student (BM 28) at Xavier Institute of Management Bhubaneswar (XIMB). Explore his projects in machine learning, embedded systems, and UI/UX design.",
  keywords: [
    "Subhadeep Mandal",
    "XIMB",
    "MBA",
    "BM 28",
    "Xavier Institute of Management",
    "portfolio",
    "machine learning",
    "business management",
    "Kolkata",
    "Bhubaneswar",
    "engineer MBA",
  ],
  authors: [{ name: "Subhadeep Mandal", url: "https://github.com/subhhhx" }],
  creator: "Subhadeep Mandal",
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Subhadeep Mandal | MBA Student at XIMB",
    description:
      "Engineer turned MBA student at XIMB BM 28. Projects in ML, embedded systems, and UI/UX. Based in Kolkata.",
    siteName: "Subhadeep Mandal Portfolio",
    images: [
      {
        url: "https://github.com/subhhhx.png",
        width: 400,
        height: 400,
        alt: "Subhadeep Mandal",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Subhadeep Mandal | MBA Student at XIMB",
    description:
      "Engineer turned MBA student at XIMB BM 28. Projects in ML, embedded systems, and UI/UX.",
    images: ["https://github.com/subhhhx.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
          defer
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
