import DashMobileNav from "@/components/dashboard/DashMobileNav";
import DashNavbar from "@/components/dashboard/DashNavbar";
import { dashdata } from "@/data/dashboard.data";
// import DashNavMobile from "@/components/dashboard/DashNavMobile";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dropdata = [
    {
      name: "Create New",
      route: "/admin/posts",
      linkstate: undefined,
    },
    {
      name: "Post Reports",
      route: "/admin/posts/reports",
      linkstate: "reports",
    },
    // {
    //   name: "Published Posts",
    //   route: "/dashboard/posts/published",
    //   linkstate: "published",
    // },
    // {
    //   name: "Draft",
    //   route: "/dashboard/posts/draft",
    //   linkstate: "draft",
    // },
    // {
    //   name: "Pending posts",
    //   route: "/dashboard/posts/pending",
    //   linkstate: "pending",
    // },
  ];
  return (
    <div className="dash_pages">
      <div className="dash_pagesnav">
        <DashMobileNav data={dropdata} header={"Create New"} />
        <DashNavbar data={dropdata} />
      </div>
      <div className="dash_pageschild">{children}</div>
    </div>
  );
}
