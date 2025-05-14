import DashMobileNav from "@/components/dashboard/DashMobileNav";
import DashNavbar from "@/components/dashboard/DashNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dashdata = [
    {
      name: "Approved",
      route: "/dashboard/payment/approved",
      linkstate: "approved",
    },
    {
      name: "Pending",
      route: "/dashboard/payment/pending",
      linkstate: "pending",
    },
    {
      name: "Rejected",
      route: "/dashboard/payment/rejected",
      linkstate: "rejected",
    },
  ];
  return (
    <div className="dash_pages">
      <div className="dash_pagesnav">
        <DashMobileNav data={dashdata} header={"All"} />
        <DashNavbar data={dashdata} />
      </div>

      <div className="dash_pageschild">{children}</div>
    </div>
  );
}
