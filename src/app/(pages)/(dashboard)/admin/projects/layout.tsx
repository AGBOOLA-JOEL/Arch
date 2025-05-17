import DashMobileNav from "@/components/dashboard/DashMobileNav";
import DashNavbar from "@/components/dashboard/DashNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dashdata = [
    {
      name: "Pending",
      route: "/admin/projects/pending",
      linkstate: "pending",
    },
    {
      name: "Approved",
      route: "/admin/projects/approved",
      linkstate: "approved",
    },

    {
      name: "Rejected",
      route: "/admin/projects/rejected",
      linkstate: "rejected",
    },
  ];
  return (
    <div className="dash_pages">
      <div className="dash_pagesnav">
        {/* <DashMobileNav data={dashdata} header={"All"} /> */}
        <DashNavbar data={dashdata} />
      </div>

      <div className="dash_pageschild">{children}</div>
    </div>
  );
}
