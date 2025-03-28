import type { Metadata } from "next";
import "./styles/global.css";
import App from "./App";
import ProvidersTree from "@/_lib/providertree";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <ProvidersTree>
        <App>{children}</App>
      </ProvidersTree>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Archcache",
  description:
    "Explore our archive of innovative architectural designs, projects, and resources. Discover inspiration for your next architectural venture.",
};
