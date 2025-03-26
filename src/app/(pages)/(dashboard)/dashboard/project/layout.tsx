import DashNavbar from "@/components/dashboard/DashNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dashdata = [
    {
      name: "Approved",
      route: "/dashboard/project/approved",
      linkstate: "approved",
    },
    {
      name: "Pending",
      route: "/dashboard/project/pending",
      linkstate: "pending",
    },
    {
      name: "Rejected",
      route: "/dashboard/project/rejected",
      linkstate: "rejected",
    },
  ];
  return (
    <div className="dash_pages">
      <div className="dash_pagesnav">
        <DashNavbar data={dashdata} />
      </div>

      <div className="dash_pageschild">{children}</div>
    </div>
  );
}
