import DashNavbar from "@/components/dashboard/DashNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dashdata = [
    {
      name: "Your archive",
      route: "/dashboard/archive",
      linkstate: undefined,
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
