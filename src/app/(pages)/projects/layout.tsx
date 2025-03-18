"use client";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname().split("/")[1];

  return (
    <div className="projects">
      <h1 className="projects_header">{pathname}</h1>
      <div className="projects_child">{children}</div>
    </div>
  );
}
