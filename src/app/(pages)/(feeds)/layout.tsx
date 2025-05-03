"use client";
import SideBar from "@/components/sidebar/SideBar";
import { usePathname } from "next/navigation";
import NewsFeedSide from "./news/components/NewsFeedSide";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname().split("/")[1];

  return (
    <div className="feeds">
      <h1 className="feeds_header">{pathname}</h1>
      <div className="feeds_content">
        <div className="feeds_child">{children}</div>
        <div className="feeds_sidebar">
          {/* <SideBar /> */}
          <NewsFeedSide />
        </div>
      </div>
    </div>
  );
}
