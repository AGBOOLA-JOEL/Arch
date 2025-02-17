import type { Metadata } from "next";
import "./styles/global.css";
import App from "./App";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <App>{children}</App>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Archcache",
  description:
    "Explore our archive of innovative architectural designs, projects, and resources. Discover inspiration for your next architectural venture.",
  openGraph: {
    title: "Archcache",
    description:
      "Explore our archive of innovative architectural designs, projects, and resources. Discover inspiration for your next architectural venture.",
    images: [
      {
        url: "/assets/svg/Archlogo.svg",
        width: 1200,
        height: 630,
        alt: "Archcache - Architectural Archive",
      },
    ],
    siteName: "Archcache",
  },
  twitter: {
    card: "summary_large_image",
    title: "Archcache",
    description:
      "Explore our archive of innovative architectural designs, projects, and resources. Discover inspiration for your next architectural venture.",
    images: [
      {
        url: "/assets/svg/Archlogo.svg",
        width: 1200,
        height: 630,
        alt: "Archcache - Architectural Archive",
      },
    ],
  },
};
