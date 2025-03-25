import DashNavbar from "@/components/dashboard/DashNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dashdata = [
    {
      name: "All",
      route: "/dashboard/messages/all",
      linkstate: "all",
    },
    {
      name: "Unread",
      route: "/dashboard/messages/unread",
      linkstate: "unread",
    },
    {
      name: "Compose",
      route: "/dashboard/messages/compose",
      linkstate: "compose",
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
