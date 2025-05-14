import DashHead from "@/components/dashboard/DashHead";
import DashSidebar from "@/components/dashboard/DashSidebar";
import { dashdata } from "@/data/dashboard.data";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const dashdata = [
  //   {
  //     name: "Create New",
  //     route: "/dashboard/posts",
  //     linkstate: undefined,
  //   },
  //   {
  //     name: "Published Posts",
  //     route: "/dashboard/posts/published",
  //     linkstate: "published",
  //   },
  //   {
  //     name: "Draft",
  //     route: "/dashboard/posts/draft",
  //     linkstate: "draft",
  //   },
  //   {
  //     name: "Pending posts",
  //     route: "/dashboard/posts/pending",
  //     linkstate: "pending",
  //   },
  // ];
  return (
    <div className="dashboard">
      <DashHead />
      <div className="dashboard_display">
        <div className="dashboard_side">
          <DashSidebar />
        </div>
        <div className="dashboard_child">{children}</div>
      </div>
    </div>
  );
}
