import DashNavbar from "@/components/dashboard/DashNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dashdata = [
    {
      name: "All",
      route: "/admin/messages/all",
      linkstate: "all",
    },
    {
      name: "Unread",
      route: "/admin/messages/unread",
      linkstate: "unread",
    },
    {
      name: "Compose",
      route: "/admin/messages/compose",
      linkstate: "compose",
    },

    {
      name: "Report",
      route: "/admin/messages/report",
      linkstate: "report",
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
